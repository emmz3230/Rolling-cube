// components/DiceModel.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// Load the GLB model for the dice
function DiceModel({ position, rotation }) {
  const { scene } = useGLTF("/assets/cube.glb"); // Path to GLB file
  const ref = useRef();

  useFrame(() => {
    // Rotate the dice smoothly
    ref.current.rotation.x += rotation.x;
    ref.current.rotation.y += rotation.y;
  });

  return <primitive object={scene} ref={ref} position={position} />;
}

export default DiceModel;
