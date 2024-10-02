// DiceThrow.jsx
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Dice from "./Dice";

const NUM_DICE = 5; // Total number of dice
const RADIUS = 4; // Distance from the center

const DiceThrow = () => {
  const initialDiceValues = Array(NUM_DICE).fill(1); // Initial face value for each dice
  const [diceValues, setDiceValues] = useState(initialDiceValues);

  const handleDiceClick = (index) => {
    const newValue = Math.floor(Math.random() * 6) + 1; // Random value between 1 and 6
    const newDiceValues = [...diceValues];
    newDiceValues[index] = newValue;
    setDiceValues(newDiceValues);
    console.log(`Dice ${index + 1} rolled: ${newValue}`); // Log the new value
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 5]} />
        {Array.from({ length: NUM_DICE }).map((_, index) => {
          const angle = (index / NUM_DICE) * Math.PI * 2; // Calculate angle for circular positioning
          const x = Math.cos(angle) * RADIUS; // X position
          const z = Math.sin(angle) * RADIUS; // Z position
          return (
            <Dice
              key={index}
              position={[x, 0, z]} // Position the dice in a circle
              onClick={() => handleDiceClick(index)} // Handle click
            />
          );
        })}
      </Canvas>
    </div>
  );
};

export default DiceThrow;
