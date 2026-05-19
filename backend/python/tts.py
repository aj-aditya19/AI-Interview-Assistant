import argparse
import os
import sys
import tempfile

try:
    import pyttsx3
except Exception as exc:
    print(f"pyttsx3 is required: {exc}", file=sys.stderr)
    sys.exit(1)


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate WAV audio from text.")
    parser.add_argument("--text", required=True)
    parser.add_argument("--output", required=True)
    args = parser.parse_args()

    text = args.text.strip()
    if not text:
      print("Text is required", file=sys.stderr)
      return 1

    output_path = args.output
    output_dir = os.path.dirname(output_path)
    if output_dir:
        os.makedirs(output_dir, exist_ok=True)

    engine = pyttsx3.init()
    engine.setProperty("rate", 175)
    engine.setProperty("volume", 1.0)
    engine.save_to_file(text, output_path)
    engine.runAndWait()

    if not os.path.exists(output_path):
        print("Failed to create audio output", file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())