import { Link } from "react-router";

import { ThemeSwitcher } from "@/components";

import logo from "/logo.svg";

const HeroHeader = () => {
  return (
    <header className="h-16 border-b border-base-3 bg-base-2">
      <div className="mx-auto flex h-full max-w-256 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Squell Logo" className="h-auto w-8" />
          <h1 className="text-3xl font-bold text-purple">SQUELL</h1>
        </Link>
        <div className="col-start-3 flex items-center">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default HeroHeader;
