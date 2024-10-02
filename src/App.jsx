import React from "react";
import DiceThrow from "./components/DiceThrow";
import { OrbitControls } from "@react-three/drei";

const App = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <DiceThrow />
    </div>
  );
};

export default App;
