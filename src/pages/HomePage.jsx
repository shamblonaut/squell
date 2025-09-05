import logo from "/logo.svg";

import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

const HomePage = () => {
  return (
    <main className="flex flex-1 flex-col items-center py-16 text-center">
      <img className="w-64 flex-1" src={logo} alt="Squell Logo" />
      <h1 className="m-8 text-5xl font-bold text-purple">SQUELL</h1>
      <h4 className="text-2xl font-medium italic">
        The SQL Editor of your dreams
      </h4>
      <Link
        className="my-8 flex items-center gap-2 rounded-lg bg-red px-6 py-4 text-lg font-bold text-white"
        to="/dashboard"
      >
        Get Started <ChevronRight className="h-auto w-6" />
      </Link>
    </main>
  );
};

export default HomePage;
