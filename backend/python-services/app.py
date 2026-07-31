# .\venv\Scripts\Activate.ps1  

from flask import Flask, request, jsonify
import cv2
import mediapipe as mp
import numpy as np

app = Flask(__name__)

mp_face = mp.solutions.face_detection
face_detector = mp_face.FaceDetection(
    model_selection=0,
    min_detection_confidence=0.5
)


@app.route("/detect", methods=["POST"])
def detect_face():
    if "image" not in request.files:
        return jsonify({
            "success": False,
            "message": "No image uploaded"
        }), 400

    file = request.files["image"]

    data = np.frombuffer(file.read(), np.uint8)
    image = cv2.imdecode(data, cv2.IMREAD_COLOR)

    if image is None:
        return jsonify({
            "success": False,
            "message": "Invalid image"
        }), 400

    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    results = face_detector.process(rgb)

    face_detected = results.detections is not None
    face_count = len(results.detections) if face_detected else 0

    return jsonify({
        "success": True,
        "faceDetected": face_detected,
        "faces": face_count
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)