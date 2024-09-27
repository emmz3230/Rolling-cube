import React, { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useDrag } from "react-use-gesture";
import Dice from "./Dice";

// Simulate server response with the new JSON format
const fetchDiceResult = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        cubes: [
          { diceId: 1, face: 4 },
          { diceId: 2, face: 1 },
          { diceId: 3, face: 3 },
          { diceId: 4, face: 3 },
          { diceId: 5, face: 3 },
        ],
        base: [
          {
            price: 10,
            dices: [{ diceId: 2, face: 1, isMoved: true }],
          },
          {
            price: 30,
            dices: [
              { diceId: 3, face: 3, isMoved: true },
              { diceId: 4, face: 3, isMoved: true },
              { diceId: 5, face: 3, isMoved: true },
            ],
          },
        ],
        params: {
          turnNumber: 1,
          sessionScore: 40,
          score: 150,
          mustPlay: true,
        },
      });
    }, 1000);
  });
};

// Define rotation logic for dice faces
const getRotationForNumber = (number) => {
  const rotations = {
    1: { x: 0, y: 0, z: 0 },
    2: { x: Math.PI / 2, y: 0, z: 0 },
    3: { x: Math.PI, y: 0, z: 0 },
    4: { x: Math.PI / 2, y: Math.PI / 2, z: 0 },
    5: { x: Math.PI / 2, y: Math.PI, z: 0 },
    6: { x: 0, y: Math.PI / 2, z: 0 },
  };
  return rotations[number];
};

const DiceContainer = () => {
  const [dicePositions] = useState([
    [-2, 0, 0],
    [-1, 0, 0],
    [0, 0, 0],
    [1, 0, 0],
    [2, 0, 0],
  ]);

  const diceRefs = useRef([]);

  // Handle smooth dice rotation on each frame
  useFrame(() => {
    diceRefs.current.forEach((dice) => {
      dice.rotation.x += 0.01;
      dice.rotation.y += 0.01;
    });
  });

  // Swipe interaction to trigger dice roll
  const bind = useDrag(({ swipe: [swipeX] }) => {
    if (swipeX !== 0) {
      fetchDiceResult().then(({ cubes }) => {
        stopDice(cubes);
      });
    }
  });

  // Stop dice based on server response
  const stopDice = (diceResults) => {
    diceResults.forEach(({ diceId, face }) => {
      const dice = diceRefs.current[diceId - 1]; // Match dice by id
      const targetRotation = getRotationForNumber(face);
      dice.rotation.set(
        targetRotation.x,
        targetRotation.y,
        targetRotation.z
      );
    });
  };

  return (
    <group {...bind()}>
      {dicePositions.map((pos, idx) => (
        <Dice
          key={idx}
          position={pos}
          ref={(el) => (diceRefs.current[idx] = el)}
        />
      ))}
    </group>
  );
};

export default DiceContainer;
