"use client";
import React, { useState } from "react";
import { KeyProps } from "../types/Dialer";
import { Key } from "./key";
import { Phone } from "lucide-react";

export const Dialer: React.FC = () => {
  const [dialedNumber, setDialedNumber] = useState<string>("");

  const handleShortPress = (keyLabel: string) => {
    setDialedNumber((prev) => prev + keyLabel);
  };

  const handleLongPress = (keyLabel: string) => {
    if (keyLabel === "0") {
      setDialedNumber((prev) => prev + "+");
    }
  };

  const keys = [
    { keyLabel: "1" },
    { keyLabel: "2", notation: "ABC" },
    { keyLabel: "3", notation: "DEF" },
    { keyLabel: "4", notation: "GHI" },
    { keyLabel: "5", notation: "JKL" },
    { keyLabel: "6", notation: "MNO" },
    { keyLabel: "7", notation: "PQRS" },
    { keyLabel: "8", notation: "TUV" },
    { keyLabel: "9", notation: "WXYZ" },
    { keyLabel: "*", notation: "" },
    {
      keyLabel: "0",
      notation: "+",
      extraAction: () => handleLongPress("0"),
    },
    { keyLabel: "#", notation: "" },
  ];
  return (
    <div className="dialer flex flex-col space-y-10 items-center">
      <div className="">
        <input
          value={dialedNumber}
          onChange={(e) => setDialedNumber(e.target.value)}
          placeholder="Enter Number"
          max={12}
          className="display text-center text-gray-300 font-mono text-xl border border-gray-300 w-60 bg-transparent p-2"
        />
      </div>
      <div className="keys grid grid-cols-3 gap-5">
        {keys.map((key) => (
          <Key
            key={key.keyLabel}
            keyLabel={key.keyLabel}
            notation={key.notation}
            extraAction={key.extraAction}
            onShortPress={handleShortPress}
          />
        ))}
      </div>
      <div className="bg-green-500 h-16 w-16 rounded-full flex justify-center items-center">
        <Phone color="white" />
      </div>
    </div>
  );
};
