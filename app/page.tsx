import { Dialer } from "./components/dialer";

export default function Home() {
  // todo: save dialed numbers in localstorage and allow the user to call them
  return (
    <div className="bg-[#2E2E38] h-screen flex justify-center items-center">
      <div className="dialpad-and-input">
        <Dialer />
      </div>
    </div>
  );
}
