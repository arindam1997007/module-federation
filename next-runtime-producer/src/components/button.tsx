"use client";
import confetti from "canvas-confetti";
import { useEffect } from "react";

const Button = () => {
  const handleClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }, // Adjust to control the starting position
    });
  };
  useEffect(() => {
    console.log("use effect");
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Producer Button</h1>
      <button onClick={handleClick}>{"Click Me!"}</button>
    </div>
  );
};

export default Button;
