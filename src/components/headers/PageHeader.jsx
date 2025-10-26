import { Link } from "react-router";

import { ThemeSwitcher } from "@/components";

import logo from "/logo.svg";

const PageHeader = ({ title }) => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-base-3 bg-base-2 p-4">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Squell Logo" className="h-auto w-8" />
        </Link>
        {title ? (
          <div className="ml-2 border-l border-base-3 pl-2">{title}</div>
        ) : (
          <h1 className="ml-2 text-3xl font-bold text-purple">SQUELL</h1>
        )}
      </div>
      <div className="flex items-center">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default PageHeader;
