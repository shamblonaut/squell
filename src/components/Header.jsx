import logo from "/logo.svg";

import { Link } from "react-router";

import { ThemeSwitcher } from "@/components";

const Header = () => {
  return (
    <header className="grid grid-cols-[1fr_2fr_1fr] items-center border-b border-base-3 bg-base-2 px-8 py-4">
      <Link to="/">
        <img src={logo} alt="Squell Logo" className="h-auto w-8" />
      </Link>
      <Link to="/" className="justify-self-center">
        <h1 className="text-4xl font-bold text-red">SQUELL</h1>
      </Link>
      <div className="flex items-center justify-self-end">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
