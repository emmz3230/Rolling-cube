import React, { useRef } from "react";
// import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useGLTF } from "@react-three/drei";

const Dice = React.forwardRef(({ position }, ref) => {
  const gltf = useGLTF("/assets/cube.glb"); // Use the GLB format
  // src\assets\cube.glb
  return (
    <mesh position={position} ref={ref}>
      <primitive object={gltf.scene} />
    </mesh>
  );
});

export default Dice;
