from flask import Flask, Response
import cv2

app = Flask(__name__)

camera = cv2.VideoCapture(0)

def generate_frames():
    while True:
        success, frame = camera.read()

        if not success:
            break

        _, buffer = cv2.imencode('.jpg', frame)

        frame = buffer.tobytes()

        yield (
            b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n'
            + frame +
            b'\r\n'
        )

@app.route('/video_feed')
def video_feed():
    return Response(
        generate_frames(),
        mimetype='multipart/x-mixed-replace; boundary=frame'
    )

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)