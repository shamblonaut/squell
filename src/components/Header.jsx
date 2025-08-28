import logo from "/logo.svg";

import { Link } from "react-router";

const Header = () => {
  return (
    <header className="flex items-center justify-center p-4">
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="Squell Logo" className="h-auto w-12" />
        <h1 className="text-4xl font-bold">SQUELL</h1>
      </Link>
    </header>
  );
};

export default Header;
