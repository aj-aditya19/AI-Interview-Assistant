import { spawn } from "child_process";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pythonScriptPath = path.join(
  __dirname,
  "..",
  "python",
  "record_session.py",
);
const recordingsRoot = path.join(__dirname, "..", "recordings");
const activeRecordings = new Map();

const toText = (value) => String(value || "").trim();

const ensureDir = async (dirPath) => {
  await fs.mkdir(dirPath, { recursive: true });
};

const waitForClose = (child, timeoutMs = 15000) =>
  new Promise((resolve) => {
    let settled = false;
    const finish = (result) => {
      if (settled) {
        return;
      }
      settled = true;
      resolve(result);
    };

    const timeoutId = setTimeout(() => {
      finish({ timedOut: true });
    }, timeoutMs);

    child.once("close", (code, signal) => {
      clearTimeout(timeoutId);
      finish({ code, signal });
    });

    child.once("error", (error) => {
      clearTimeout(timeoutId);
      finish({ error });
    });
  });

const buildRecordingSession = async ({ userId, setup }) => {
  const sessionId = `${Date.now()}-${randomUUID().slice(0, 8)}`;
  const userKey = toText(userId) || "anonymous";
  const outputDir = path.join(recordingsRoot, userKey, sessionId);

  await ensureDir(outputDir);

  const pythonBinary = process.env.PYTHON_BINARY || "python";
  const child = spawn(
    pythonBinary,
    [
      pythonScriptPath,
      "--output-dir",
      outputDir,
      "--session-id",
      sessionId,
      "--camera-index",
      String(Number(process.env.CAMERA_INDEX || 0)),
      "--fps",
      String(Number(process.env.CAMERA_FPS || 30)),
      "--width",
      String(Number(process.env.CAMERA_WIDTH || 1280)),
      "--height",
      String(Number(process.env.CAMERA_HEIGHT || 720)),
      "--audio-rate",
      String(Number(process.env.AUDIO_SAMPLE_RATE || 44100)),
      "--snapshot-interval",
      String(Number(process.env.CAMERA_SNAPSHOT_INTERVAL || 1)),
    ],
    {
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  const stderr = [];
  child.stdout.on("data", (chunk) => {
    const text = chunk.toString().trim();
    if (text) {
      console.log(`[camera-recorder:${sessionId}] ${text}`);
    }
  });
  child.stderr.on("data", (chunk) => {
    stderr.push(chunk.toString());
  });

  const closePromise = waitForClose(child);
  activeRecordings.set(userKey, {
    sessionId,
    outputDir,
    setup,
    child,
    closePromise,
    stderr,
  });

  return {
    sessionId,
    outputDir,
    userKey,
  };
};

export const startInterviewRecording = async ({ userId, setup }) => {
  const userKey = toText(userId) || "anonymous";
  const existing = activeRecordings.get(userKey);

  if (existing) {
    await stopInterviewRecording({ userId });
  }

  return buildRecordingSession({ userId, setup });
};

export const stopInterviewRecording = async ({ userId }) => {
  const userKey = toText(userId) || "anonymous";
  const recording = activeRecordings.get(userKey);

  if (!recording) {
    return null;
  }

  if (recording.child.exitCode === null && !recording.child.killed) {
    recording.child.kill("SIGTERM");
  }

  const outcome = await Promise.race([
    recording.closePromise,
    new Promise((resolve) =>
      setTimeout(() => resolve({ timedOut: true }), 15000),
    ),
  ]);

  activeRecordings.delete(userKey);

  let manifest = null;
  const manifestPath = path.join(recording.outputDir, "manifest.json");

  try {
    const manifestText = await fs.readFile(manifestPath, "utf-8");
    manifest = JSON.parse(manifestText);
  } catch {
    manifest = null;
  }

  return {
    sessionId: recording.sessionId,
    outputDir: recording.outputDir,
    manifestPath,
    manifest,
    outcome,
    stderr: recording.stderr.join("").trim(),
  };
};

export const getActiveInterviewRecording = (userId) => {
  const userKey = toText(userId) || "anonymous";
  return activeRecordings.get(userKey) || null;
};
