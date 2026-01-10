import { PanelLeftOpen } from "lucide-react";

import { ThemeSwitcher } from "@/components";

interface DatabaseHeaderProps {
  title: string;
  isSidebarOpen: boolean;
  openSidebar: () => void;
}

const DatabaseHeader = ({
  title,
  isSidebarOpen,
  openSidebar,
}: DatabaseHeaderProps) => {
  return (
    <header className="relative flex h-16 items-center justify-center border-b border-base-3 bg-base-2">
      {!isSidebarOpen && (
        <button onClick={openSidebar} className="absolute left-0 px-4">
          <PanelLeftOpen className="w-5 text-invert-1" />
        </button>
      )}
      <div className="text-2xl font-medium">{title}</div>
      <div className="absolute right-0 flex items-center px-4">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default DatabaseHeader;
