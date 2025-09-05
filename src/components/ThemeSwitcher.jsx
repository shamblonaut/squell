import { useContext } from "react";
import { Moon, Sun } from "lucide-react";

import { ThemeContext } from "@/contexts";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleSwitch = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    localStorage.setItem("squell-theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  return (
    <button onClick={handleSwitch}>
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
};

export default ThemeSwitcher;
