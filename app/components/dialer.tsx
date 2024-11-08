"use client";
import React, { useState, useEffect } from "react";
import { KeyProps } from "../types/Dialer";
import { Key } from "./key";
import { Phone, Delete, CircleX } from "lucide-react";
import { CommunicationIdentityClient } from "@azure/communication-identity";
import {
  CallClient,
  CallAgent,
  DeviceManager,
} from "@azure/communication-calling";
import { AzureCommunicationTokenCredential } from "@azure/communication-common";

export const Dialer: React.FC = () => {
  const [dialedNumber, setDialedNumber] = useState<string>("");
  const [callAgent, setCallAgent] = useState<CallAgent | null>(null);
  const [deviceManager, setDeviceManager] = useState<DeviceManager | null>(
    null
  );

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

  const setupCallClient = async () => {
    try {
      const identityClient = new CommunicationIdentityClient(
        process.env.NEXT_PUBLIC_ACS_CONNECTION_STRING || ""
      );
      const tokenResponse = await identityClient.createUserAndToken(["voip"]);
      const token = tokenResponse.token;
      const communicationTokenCredential =
        new AzureCommunicationTokenCredential(token);

      const callClient = new CallClient();
      const agent = await callClient.createCallAgent(
        communicationTokenCredential
      );
      const devices = await callClient.getDeviceManager();
      setCallAgent(agent);
      setDeviceManager(devices);

      agent.on("callsUpdated", (e) => {
        if (e.added.length > 0) {
          const call = e.added[0];
          call.on("stateChanged", () => {
            console.log("Call state changed:", call.state);
          });
        }
      });
    } catch (error) {
      console.error("Failed to set up call client:", error);
    }
  };
  useEffect(() => {
    setupCallClient();
  }, []);

  const placeCall = async () => {
    if (callAgent && dialedNumber) {
      try {
        const call = callAgent.startCall([{ phoneNumber: dialedNumber }], {
          alternateCallerId: { phoneNumber: "+917678170515" },
        });
        console.log(dialedNumber);

        call.on("stateChanged", () => {
          console.log("Call state changed:", call.state);
        });
      } catch (error) {
        console.error("Failed to place call:", error);
      }
    } else {
      console.log("Call agent not set up or no number dialed");
    }
  };

  const handleBackspace = () => {
    setDialedNumber((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setDialedNumber("");
  };
  return (
    <div className="dialer flex flex-col space-y-10 items-center">
      <div className="flex space-x-2 items-center">
        <input
          value={dialedNumber}
          onChange={(e) => setDialedNumber(e.target.value)}
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

        <div
          className="bg-green-500 h-16 w-16 rounded-full flex justify-center items-center cursor-pointer"
          onClick={placeCall}
        >
          <Phone color="white" />
        </div>
        {dialedNumber != "" && (
          <CircleX color="white" onClick={handleClear} className="" />
        )}
      </div>
    </div>
  );
};
