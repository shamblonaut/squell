import { useState } from "react";
import { Moon, Sun, SunMoon } from "lucide-react";

import { useTheme } from "@/hooks";
import { Popup } from "@/components";
import { getComputedTheme } from "@/utils/helpers";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const switchTheme = (nextTheme) => {
    setTheme(nextTheme);
    setIsPopupOpen(false);

    localStorage.setItem("squell-theme", nextTheme);
    document.documentElement.setAttribute("data-theme", getComputedTheme());
  };

  return (
    <div className="flex flex-col relative">
      <button onClick={() => setIsPopupOpen((prev) => !prev)}>
        {getComputedTheme() === "light" ? (
          <Sun className="w-5" />
        ) : (
          <Moon className="w-5" />
        )}
      </button>
      <Popup
        open={isPopupOpen}
        onClose={() => {
          if (isPopupOpen) setIsPopupOpen(false);
        }}
        className="right-0 left-auto"
      >
        <div className="min-w-32 flex flex-col gap-2 font-medium">
          <button
            onClick={() => switchTheme("light")}
            className={`flex gap-2 text-start hover:bg-base-4 p-2 rounded-md border-base-4 ${theme === "light" ? "border" : ""}`}
          >
            <Sun className="w-4" />
            <p>Light</p>
          </button>
          <button
            onClick={() => switchTheme("dark")}
            className={`flex gap-2 text-start hover:bg-base-4 p-2 rounded-md border-base-4 ${theme === "dark" ? "border" : ""}`}
          >
            <Moon className="w-4" />
            <p>Dark</p>
          </button>
          <button
            onClick={() => switchTheme("system")}
            className={`flex gap-2 text-start hover:bg-base-4 p-2 rounded-md border-base-4 ${theme === "system" ? "border" : ""}`}
          >
            <SunMoon className="w-4" />
            <p>System</p>
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default ThemeSwitcher;
