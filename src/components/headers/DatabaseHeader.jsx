import { PanelLeftOpen } from "lucide-react";

import { ThemeSwitcher } from "@/components";

const DatabaseHeader = ({ title, isSidebarOpen, openSidebar }) => {
  return (
    <header className="relative flex justify-center items-center h-16 border-b border-base-3 bg-base-2">
      {!isSidebarOpen && (
        <button onClick={openSidebar} className="px-4 absolute left-0">
          <PanelLeftOpen className="text-invert-1 w-5" />
        </button>
      )}
      <div className="text-2xl font-medium">{title}</div>
      <div className="flex items-center px-4 absolute right-0">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default DatabaseHeader;
