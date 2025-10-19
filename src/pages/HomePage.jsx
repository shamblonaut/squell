import logo from "/logo.svg";

import { Link } from "react-router";
import { Box, LayoutDashboard } from "lucide-react";

const HomePage = () => {
  return (
    <main className="flex flex-1 flex-col items-center py-12 text-center">
      <div className="flex-1">
        <img className="h-[min(40vw,_40svh)]" src={logo} alt="Squell Logo" />
      </div>
      <h1 className="m-8 text-5xl font-bold text-purple">SQUELL</h1>
      <h4 className="text-2xl font-medium italic">
        The SQL Editor of your dreams
      </h4>
      <div>
        <Link
          className="my-8 flex w-48 items-center justify-center gap-2 rounded-lg bg-red px-6 py-4 text-lg font-bold text-white"
          to="/dashboard"
        >
          <LayoutDashboard /> Dashboard
        </Link>
        <Link
          className="my-8 flex w-48 items-center justify-center gap-2 rounded-lg bg-purple px-6 py-4 text-lg font-bold text-white"
          to="/sandbox"
        >
          <Box /> Sandbox
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
