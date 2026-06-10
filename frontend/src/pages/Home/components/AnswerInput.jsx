// import { useState } from "react";

// function AnswerInput() {
//   const [failed, setFailed] = useState(false);

//   return (
//     <div className="camera-container">
//       {!failed ? (
//         <img
//           src="http://localhost:5001/video_feed"
//           alt="Camera Feed"
//           className="camera-feed"
//           onError={() => setFailed(true)}
//         />
//       ) : (
//         <div className="camera-error">📷 Camera feed unavailable</div>
//       )}
//     </div>
//   );
// }

// export default AnswerInput;

import { useEffect, useRef, useState } from "react";

function AnswerInput() {
  const videoRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let stream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error(err);
        setError("Camera access denied or unavailable.");
      }
    };

    startCamera();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  if (error) {
    return (
      <div className="camera-container">
        <div className="camera-error">📷 {error}</div>
      </div>
    );
  }

  return (
    <div className="camera-container">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="camera-feed"
      />
    </div>
  );
}

export default AnswerInput;
