"use client";
import React, { useState, useEffect } from "react";
import { Phone, Delete, CircleX } from "lucide-react";
import { Key } from "./key";
import twilio from "twilio";

interface KeyProps {
  keyLabel: string;
  notation?: string;
  extraAction?: () => void;
  onShortPress: (keyLabel: string) => void;
}

export const Dialer: React.FC = () => {
  const [dialedNumber, setDialedNumber] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);

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
    { keyLabel: "*" },
    {
      keyLabel: "0",
      notation: "+",
      extraAction: () => handleLongPress("0"),
    },
    { keyLabel: "#" },
  ];

  const handleBackspace = () => {
    setDialedNumber((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setDialedNumber("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const regex = /^[0-9+\s()]*$/;
    if (regex.test(input)) {
      setDialedNumber(input);
    }
  };

  const makeCall = async () => {
    try {
      const response = await fetch("/api/call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to: dialedNumber }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Call SID:", data.sid);
      } else {
        console.error("Failed to make a call:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex flex-col space-y-10 items-center p-6 rounded-lg">
      <div className="flex space-x-2 items-center">
        <input
          type="tel"
          value={dialedNumber}
          onChange={handleInputChange}
          placeholder="Enter Number"
          className="text-center text-gray-300 font-mono text-xl border border-gray-300 w-60 bg-transparent p-3 rounded-full focus:outline-none focus:border-green-500"
        />
      </div>

      <div className="grid grid-cols-3 gap-5">
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
        {dialedNumber && (
          <button
            onClick={handleBackspace}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <Delete color="white" />
          </button>
        )}

        <button
          onClick={makeCall}
          disabled={isConnecting || !dialedNumber}
          className={`h-16 w-16 rounded-full flex justify-center items-center transition-colors ${
            isConnecting || !dialedNumber
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 cursor-pointer"
          }`}
        >
          <Phone color="white" />
        </button>

        {dialedNumber && (
          <button
            onClick={handleClear}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <CircleX color="white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Dialer;
