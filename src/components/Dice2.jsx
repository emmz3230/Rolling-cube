// components/Dice.jsx
import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Vector3 } from "three";
import DiceModel from "./DiceModel"; // Import the DiceModel component
import diceDataFile from "../dice.json"; // Import the JSON file

const Dice = () => {
  const [diceData, setDiceData] = useState([]);
  const [loading, setLoading] = useState(true);

  const rotationSpeeds = useRef([
    { x: 0.01, y: 0.01 }, // Dice 1
    { x: 0.02, y: 0.02 }, // Dice 2
    { x: 0.03, y: 0.03 }, // Dice 3
    { x: 0.04, y: 0.04 }, // Dice 4
    { x: 0.05, y: 0.05 }, // Dice 5
  ]);

  useEffect(() => {
    // Load dice data from the imported JSON file
    setDiceData(diceDataFile.cubes);
    setLoading(false);
  }, []);

  const handleRollDice = () => {
    // Simulate rolling the dice by updating rotations
    setLoading(true);

    // Update dice rotations
    rotationSpeeds.current.forEach((rotation) => {
      rotation.x += 0.01;
      rotation.y += 0.01;
    });

    // Simulate a server response for the dice roll (you can modify diceData here)
    setDiceData(diceDataFile.cubes); // Simulate data update
    setLoading(false);
  };

  // Function to determine the position of dice based on their ID
  const getDicePosition = (diceId) => {
    switch (diceId) {
      case 1:
        return new Vector3(-2, 1, 0);
      case 2:
        return new Vector3(0, 1, 0);
      case 3:
        return new Vector3(2, 1, 0);
      case 4:
        return new Vector3(-1, -1, 0);
      case 5:
        return new Vector3(1, -1, 0);
      default:
        return new Vector3(0, 0, 0);
    }
  };

  // Get dice rotation based on the current face value
  const getDiceRotation = (face) => {
    const faceRotations = {
      1: { x: Math.PI / 2, y: 0 },
      2: { x: 0, y: Math.PI / 2 },
      3: { x: 0, y: 0 },
      4: { x: 0, y: Math.PI },
      5: { x: 0, y: -Math.PI / 2 },
      6: { x: -Math.PI / 2, y: 0 },
    };
    return faceRotations[face] || { x: 0, y: 0 };
  };

  if (loading) {
    return <div>Loading dice...</div>;
  }

  return (
    <div>
      <button onClick={handleRollDice}>Roll Dice</button>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        {diceData.map((dice) => (
          <DiceModel
            key={dice.diceId}
            position={getDicePosition(dice.diceId)}
            rotation={getDiceRotation(dice.face)}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default Dice;
