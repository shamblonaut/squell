import { Moon, Sun, SunMoon } from "lucide-react";
import { useState } from "react";

import { Popup } from "@/components";
import { useTheme } from "@/hooks";
import { getComputedTheme } from "@/utils/helpers";
import type { Theme } from "@/utils/types";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const switchTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);
    setIsPopupOpen(false);

    localStorage.setItem("squell-theme", nextTheme);
    document.documentElement.setAttribute("data-theme", getComputedTheme());
  };

  return (
    <div className="relative flex flex-col">
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
        rightAligned={true}
        className="mt-2"
      >
        <div className="flex min-w-32 flex-col gap-2 font-medium">
          <button
            onClick={() => switchTheme("light")}
            className={`${theme === "light" ? "border" : ""} flex gap-2 rounded-md border-base-4 p-2 text-start hover:bg-base-4`}
          >
            <Sun className="w-4" />
            <p>Light</p>
          </button>
          <button
            onClick={() => switchTheme("dark")}
            className={`${theme === "dark" ? "border" : ""} flex gap-2 rounded-md border-base-4 p-2 text-start hover:bg-base-4`}
          >
            <Moon className="w-4" />
            <p>Dark</p>
          </button>
          <button
            onClick={() => switchTheme("system")}
            className={`${theme === "system" ? "border" : ""} flex gap-2 rounded-md border-base-4 p-2 text-start hover:bg-base-4`}
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
