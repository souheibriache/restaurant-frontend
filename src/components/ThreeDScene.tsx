import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Model = (props: any) => {
  const { scene } = useGLTF("/models/adamHead.gltf");
  return <primitive object={scene} {...props} />;
};

const ThreeDScene = () => {
  return (
    <Canvas
      style={{ height: "50vh", background: "black", borderRadius: "5px" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <directionalLight position={[0, 10, 10]} intensity={2} />
      <hemisphereLight intensity={1} groundColor={"red"} />
      <Suspense fallback={<div>Loading...</div>}>
        <Model scale={[1, 1, 1]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeDScene;
