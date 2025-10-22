import { Link, Outlet } from "react-router";

import { ThemeProvider } from "@/providers";
import { ThemeSwitcher } from "@/components";

import logo from "/logo.svg";

const RootLayout = () => {
  return (
    <ThemeProvider>
      <div className="flex min-h-svh flex-col">
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
        <main className="flex-1 flex flex-col mx-auto mt-12 mb-8 max-w-256">
          <div className="flex-1 flex flex-col min-w-[min(64rem,_100vw)]">
            <Outlet />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default RootLayout;
