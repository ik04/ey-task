"use client";
import React, { useState } from "react";
import { KeyProps } from "../types/Dialer";

export const Key: React.FC<KeyProps> = ({
  keyLabel,
  notation,
  extraAction,
  onShortPress,
}) => {
  const longPressThreshold = 500;
  const [pressStart, setPressStart] = useState<number | null>(null);

  const handleMouseDown = () => {
    setPressStart(Date.now());
  };

  const handleMouseUp = () => {
    if (pressStart) {
      const pressDuration = Date.now() - pressStart;
      setPressStart(null);

      if (pressDuration >= longPressThreshold) {
        extraAction && extraAction();
      } else {
        onShortPress && onShortPress(keyLabel);
      }
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="key font-mono w-16 h-16 flex flex-col justify-center items-center cursor-pointer 
                 rounded-full text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none 
                 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      <p className="text-xl font-semibold">{keyLabel}</p>
      {notation && <small className="text-xs text-gray-500">{notation}</small>}
    </div>
  );
};
