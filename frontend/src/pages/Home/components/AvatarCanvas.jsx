import { Canvas } from "@react-three/fiber";

export default function AvatarCanvas() {
  return (
    <Canvas
      camera={{
        position: [0, 1.4, 2],
        fov: 30,
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[2, 2, 2]} />
    </Canvas>
  );
}
