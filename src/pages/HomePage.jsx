import { Link } from "react-router";
import { Box, LayoutDashboard } from "lucide-react";

import logo from "/logo.svg";

const HomePage = () => {
  return (
    <div className="flex flex-1 flex-col items-center text-center">
      <div>
        <p className="text-5xl">
          The <span className="font-bold text-red">SQL</span> Editor
        </p>
        <p className="py-6 text-4xl font-medium text-purple">of your dreams</p>
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <img className="h-[min(48vw,_32svh)]" src={logo} alt="Squell Logo" />
      </div>
      <div className="my-8 flex flex-col gap-4 lg:flex-row">
        <Link
          className="flex w-48 items-center justify-center gap-2 rounded-lg bg-red px-6 py-4 text-lg font-bold text-white"
          to="/dashboard"
        >
          <LayoutDashboard /> Dashboard
        </Link>
        <Link
          className="flex w-48 items-center justify-center gap-2 rounded-lg bg-purple px-6 py-4 text-lg font-bold text-white"
          to="/sandbox"
        >
          <Box /> Sandbox
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
