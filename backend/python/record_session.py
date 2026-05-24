import argparse
import json
import os
import signal
import sys
import threading
import time
from datetime import datetime, timezone

try:
    import cv2
except Exception as exc:
    print(f"opencv-python is required: {exc}", file=sys.stderr)
    sys.exit(1)

try:
    import numpy as np
except Exception as exc:
    print(f"numpy is required: {exc}", file=sys.stderr)
    sys.exit(1)

try:
    import sounddevice as sd
except Exception as exc:
    print(f"sounddevice is required: {exc}", file=sys.stderr)
    sys.exit(1)

try:
    import soundfile as sf
except Exception as exc:
    print(f"soundfile is required: {exc}", file=sys.stderr)
    sys.exit(1)

running = True


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def stop_recording(_signum=None, _frame=None):
    global running
    running = False


def build_capture(index: int):
    if os.name == "nt" and hasattr(cv2, "CAP_DSHOW"):
        capture = cv2.VideoCapture(index, cv2.CAP_DSHOW)
    else:
        capture = cv2.VideoCapture(index)
    return capture


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Record interview webcam frames and microphone audio."
    )
    parser.add_argument("--output-dir", required=True)
    parser.add_argument("--session-id", required=True)
    parser.add_argument("--camera-index", type=int, default=0)
    parser.add_argument("--fps", type=int, default=30)
    parser.add_argument("--width", type=int, default=1280)
    parser.add_argument("--height", type=int, default=720)
    parser.add_argument("--audio-rate", type=int, default=44100)
    parser.add_argument("--snapshot-interval", type=float, default=1.0)
    args = parser.parse_args()

    os.makedirs(args.output_dir, exist_ok=True)
    snapshots_dir = os.path.join(args.output_dir, "snapshots")
    os.makedirs(snapshots_dir, exist_ok=True)

    video_path = os.path.join(args.output_dir, "webcam.mp4")
    audio_path = os.path.join(args.output_dir, "audio.wav")
    manifest_path = os.path.join(args.output_dir, "manifest.json")

    signal.signal(signal.SIGINT, stop_recording)
    signal.signal(signal.SIGTERM, stop_recording)

    capture = build_capture(args.camera_index)
    if not capture.isOpened():
        print("Could not open the webcam", file=sys.stderr)
        return 1

    capture.set(cv2.CAP_PROP_FRAME_WIDTH, args.width)
    capture.set(cv2.CAP_PROP_FRAME_HEIGHT, args.height)
    capture.set(cv2.CAP_PROP_FPS, args.fps)
    capture.set(cv2.CAP_PROP_AUTOFOCUS, 1)
    capture.set(cv2.CAP_PROP_BUFFERSIZE, 1)

    actual_width = int(capture.get(cv2.CAP_PROP_FRAME_WIDTH) or args.width)
    actual_height = int(capture.get(cv2.CAP_PROP_FRAME_HEIGHT) or args.height)
    actual_fps = float(capture.get(cv2.CAP_PROP_FPS) or args.fps)
    if actual_width <= 0:
        actual_width = args.width
    if actual_height <= 0:
        actual_height = args.height
    if actual_fps <= 0:
        actual_fps = float(args.fps)

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    writer = cv2.VideoWriter(video_path, fourcc, actual_fps, (actual_width, actual_height))
    if not writer.isOpened():
        capture.release()
        print("Could not create the video writer", file=sys.stderr)
        return 1

    audio_chunks = []
    audio_lock = threading.Lock()
    audio_error = []

    def audio_callback(indata, _frames, _time_info, status):
        if status:
            audio_error.append(str(status))
        with audio_lock:
            audio_chunks.append(indata.copy())

    audio_stream = None
    try:
        audio_stream = sd.InputStream(
            samplerate=args.audio_rate,
            channels=1,
            dtype="int16",
            callback=audio_callback,
        )
        audio_stream.start()
    except Exception as exc:
        writer.release()
        capture.release()
        print(f"Could not start microphone capture: {exc}", file=sys.stderr)
        return 1

    started_at = utc_now()
    last_snapshot_at = time.perf_counter()
    next_frame_at = time.perf_counter()
    snapshot_count = 0
    frame_count = 0

    try:
        while running:
            now = time.perf_counter()
            if now < next_frame_at:
                time.sleep(min(0.01, next_frame_at - now))
                continue

            next_frame_at = now + (1.0 / actual_fps)

            ok, frame = capture.read()
            if not ok or frame is None:
                continue

            frame = cv2.resize(frame, (actual_width, actual_height), interpolation=cv2.INTER_AREA)
            cv2.putText(
                frame,
                "Interview Recording",
                (24, 42),
                cv2.FONT_HERSHEY_SIMPLEX,
                1.0,
                (255, 255, 255),
                2,
                cv2.LINE_AA,
            )
            cv2.putText(
                frame,
                datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                (24, actual_height - 24),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                (255, 255, 255),
                2,
                cv2.LINE_AA,
            )

            writer.write(frame)
            frame_count += 1

            if time.perf_counter() - last_snapshot_at >= args.snapshot_interval:
                snapshot_path = os.path.join(
                    snapshots_dir, f"snapshot-{snapshot_count:04d}.jpg"
                )
                cv2.imwrite(
                    snapshot_path,
                    frame,
                    [cv2.IMWRITE_JPEG_QUALITY, 95],
                )
                snapshot_count += 1
                last_snapshot_at = time.perf_counter()
    finally:
        if audio_stream is not None:
            try:
                audio_stream.stop()
            except Exception:
                pass
            try:
                audio_stream.close()
            except Exception:
                pass

        capture.release()
        writer.release()

    with audio_lock:
        if audio_chunks:
            audio_data = np.concatenate(audio_chunks, axis=0)
        else:
            audio_data = np.zeros((1, 1), dtype=np.int16)

    try:
        sf.write(audio_path, audio_data, args.audio_rate, subtype="PCM_16")
    except Exception as exc:
        print(f"Could not write audio file: {exc}", file=sys.stderr)
        return 1

    manifest = {
        "sessionId": args.session_id,
        "startedAt": started_at,
        "endedAt": utc_now(),
        "videoFile": video_path,
        "audioFile": audio_path,
        "snapshotsDir": snapshots_dir,
        "frameCount": frame_count,
        "snapshotCount": snapshot_count,
        "resolution": {
            "width": actual_width,
            "height": actual_height,
        },
        "fps": actual_fps,
        "audioRate": args.audio_rate,
        "audioStatus": audio_error,
    }

    with open(manifest_path, "w", encoding="utf-8") as manifest_file:
        json.dump(manifest, manifest_file, indent=2)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
