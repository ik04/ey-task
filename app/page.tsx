"use client";
import { Dialer } from "./components/dialer";

export default function Home() {
  // todo: save dialed numbers in localstorage and allow the user to call them
  return (
    <div className="bg-gray-900 h-screen flex justify-center items-center">
      <div className="dialpad-and-input">
        <Dialer />
      </div>
    </div>
  );
}
