import { useState } from "react";

export default function AvatarCanvas({ videoUrl }) {
  if (!videoUrl) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        Loading Avatar...
      </div>
    );
  }

  return (
    <video
      src={videoUrl}
      autoPlay
      playsInline
      controls={false}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "12px",
      }}
    />
  );
}
