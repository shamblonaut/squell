import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { PanelLeftOpen } from "lucide-react";

import {
  AppDataProvider,
  ModalProvider,
  SQLEngineProvider,
  ThemeProvider,
} from "@/providers";
import { Sidebar, ThemeSwitcher } from "@/components";

const DatabaseLayout = () => {
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(
    () => window.innerWidth >= 1024,
  );

  useEffect(() => {
    let altPressed = false;
    const keyDownHandler = (event) => {
      if (event.key === "Alt") {
        altPressed = true;
      }

      if (altPressed && event.key === "o") {
        setIsSidebarOpen((isOpen) => !isOpen);
      }
    };

    const keyUpHandler = (event) => {
      if (event.key === "Alt") {
        altPressed = false;
      }
    };

    document.body.addEventListener("keydown", keyDownHandler);
    document.body.addEventListener("keyup", keyUpHandler);

    return () => {
      document.body.removeEventListener("keydown", keyDownHandler);
      document.body.removeEventListener("keyup", keyUpHandler);
    };
  }, []);

  return (
    <ThemeProvider>
      <ModalProvider>
        <AppDataProvider>
          <SQLEngineProvider>
            <div className="flex min-h-svh">
              <Sidebar
                open={isSidebarOpen}
                close={() => setIsSidebarOpen(false)}
              />
              <div className="flex flex-col flex-1">
                <header className="grid grid-cols-[max-content_auto_max-content] h-16 border-b border-base-3 bg-base-2">
                  {!isSidebarOpen && (
                    <button
                      onClick={() => setIsSidebarOpen(true)}
                      className="px-4"
                    >
                      <PanelLeftOpen className="text-invert-1 w-5" />
                    </button>
                  )}
                  <div className="flex justify-center items-center text-2xl font-medium col-start-2">
                    {location.pathname.includes("/db/") && "Database Query"}
                  </div>
                  <div className="flex col-start-3 items-center px-4">
                    <ThemeSwitcher />
                  </div>
                </header>
                <main className="flex-1 flex flex-col">
                  <Outlet />
                </main>
              </div>
            </div>
          </SQLEngineProvider>
        </AppDataProvider>
      </ModalProvider>
    </ThemeProvider>
  );
};

export default DatabaseLayout;
