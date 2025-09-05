import { useState } from "react";
import { Outlet } from "react-router";

import { getTheme } from "@/utils/helpers";
import { ThemeContext } from "@/contexts";

import { Header } from "@/components";

const Layout = () => {
  const [theme, setTheme] = useState(getTheme);

  return (
    <ThemeContext value={{ theme, setTheme }}>
      <div className="flex h-svh flex-col">
        <Header />
        <Outlet />
      </div>
    </ThemeContext>
  );
};

export default Layout;
