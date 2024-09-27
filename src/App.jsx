import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import { Experience } from "./components/Experience";
// import DiceContainer from "./components/DiceContainer";
import Dice2 from "./components/Dice2";

const App = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        {/* <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} />
        <OrbitControls />
        <DiceContainer /> */}
        <Dice2 />
        {/* color attach="background" args={["#ececec"]} />
        <Experience /> */}
      </Canvas>
    </div>
  );
};
export default App;
