"use client";
import React, { useState, useEffect } from "react";
import { Key } from "./key";
import { Phone, Delete, CircleX } from "lucide-react";
import { Device } from "@twilio/voice-sdk";

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

  const handleBackspace = () => {
    setDialedNumber((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setDialedNumber("");
  };

  const handleInputChange = (e: any) => {
    const input = e.target.value;
    const regex = /^[0-9\+\s\(\)]*$/;

    if (regex.test(input)) {
      setDialedNumber(input);
    }
  };

  return (
    <div className="dialer flex flex-col space-y-10 items-center">
      <div className="flex space-x-2 items-center">
        <input
          type="tel"
          pattern="^[0-9\-\+\s\(\)]*$"
          value={dialedNumber}
          onChange={handleInputChange}
          placeholder="Enter Number"
          className="display text-center text-gray-300 font-mono text-xl border border-gray-300 w-60 bg-transparent p-3 rounded-full"
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
      <div className="flex space-x-10 items-center">
        {dialedNumber != "" && (
          <Delete color="white" onClick={handleBackspace} className="" />
        )}

        <div className="bg-green-500 h-16 w-16 rounded-full flex justify-center items-center cursor-pointer">
          <Phone color="white" />
        </div>
        {dialedNumber != "" && (
          <CircleX color="white" onClick={handleClear} className="" />
        )}
      </div>
    </div>
  );
};
