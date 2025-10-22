import { Link } from "react-router";
import { Box } from "lucide-react";

import {
  AppDataProvider,
  ModalProvider,
  SQLEngineProvider,
  ThemeProvider,
} from "@/providers";
import { Workspace, SQLEngineSuspense, ThemeSwitcher } from "@/components";

import logo from "/logo.svg";

const SandboxPage = () => {
  return (
    <ThemeProvider>
      <ModalProvider>
        <AppDataProvider>
          <SQLEngineProvider>
            <div className="flex min-h-svh flex-col">
              <header className="flex items-center justify-between p-4 h-16 border-b border-base-3 bg-base-2">
                <div className="flex">
                  <Link
                    to="/"
                    className="flex items-center gap-2 pr-2 border-r border-base-3 mr-2"
                  >
                    <img src={logo} alt="Squell Logo" className="h-auto w-8" />
                  </Link>
                  <div className="flex gap-2 text-invert-0 text-2xl items-center font-medium">
                    <Box className="w-6 h-auto" /> Sandbox
                  </div>
                </div>
                <div className="flex items-center">
                  <ThemeSwitcher />
                </div>
              </header>
              <main className="flex-1 flex flex-col">
                <SQLEngineSuspense>
                  <Workspace config={{ sandbox: true }} />
                </SQLEngineSuspense>
              </main>
            </div>
          </SQLEngineProvider>
        </AppDataProvider>
      </ModalProvider>
    </ThemeProvider>
  );
};

export default SandboxPage;
