// Dice.jsx
import React from "react";
import { useGLTF } from "@react-three/drei";

const Dice = ({ position, onClick }) => {
  const { scene } = useGLTF("/cube.glb"); // Ensure your GLB path is correct

  return (
    <mesh position={position} onClick={onClick}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Dice;
