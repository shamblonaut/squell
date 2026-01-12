import { LayoutDashboard } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router";

import { Sidebar } from "@/components";
import { DatabaseHeader } from "@/components/headers";
import type { SQLEngineDatabase } from "@/contexts";
import { useSQLEngine } from "@/hooks";

export interface DatabaseLayoutContext {
  database: SQLEngineDatabase;
  setPageTitle: React.Dispatch<React.SetStateAction<string>>;
}

const DatabaseLayout = () => {
  const { dbId } = useParams();

  const {
    database,
    switchDatabase,
    isLoading: isEngineLoading,
    error: engineError,
  } = useSQLEngine();

  const [pageTitle, setPageTitle] = useState("Database");
  const [databaseError, setDatabaseError] = useState<Error | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    () => window.innerWidth >= 1024,
  );

  useEffect(() => {
    const keybindHandler = (event: KeyboardEvent) => {
      if (event.altKey && event.key === "s") {
        setIsSidebarOpen((isOpen) => !isOpen);
      }
    };

    document.body.addEventListener("keydown", keybindHandler);
    return () => {
      document.body.removeEventListener("keydown", keybindHandler);
    };
  }, []);

  useEffect(() => {
    if (isEngineLoading || engineError) return;

    switchDatabase(Number(dbId))
      .then(() => {
        setDatabaseError(null);
      })
      .catch((reason) => {
        if (reason instanceof Error) {
          setDatabaseError(reason);
        } else {
          throw reason;
        }
      });
  }, [dbId, switchDatabase, isEngineLoading, engineError]);

  if (databaseError) {
    return (
      <main className="flex h-svh flex-col items-center justify-center px-4 text-center">
        <h2 className="m-4 text-4xl font-bold">Database Error</h2>
        <p className="m-8 text-center text-2xl font-medium text-red">
          {databaseError.message}
        </p>
        <Link
          className="my-8 flex items-center gap-2 rounded-sm bg-red px-8 py-2 text-lg font-bold text-white"
          to="/dashboard"
        >
          <LayoutDashboard /> Go to Dashboard
        </Link>
      </main>
    );
  } else if (!database) {
    return (
      <main className="flex h-svh flex-col items-center justify-center px-4 text-center">
        <div className="m-8 text-center">
          <p className="text-2xl font-medium">Loading Database...</p>
        </div>
      </main>
    );
  }

  return (
    <div className="flex min-h-svh w-svw">
      <Sidebar open={isSidebarOpen} close={() => setIsSidebarOpen(false)} />
      <div className="flex w-full flex-1 flex-col">
        <DatabaseHeader
          title={pageTitle}
          isSidebarOpen={isSidebarOpen}
          openSidebar={() => setIsSidebarOpen(true)}
        />
        <main className="flex flex-1 flex-col">
          <Outlet context={{ database, setPageTitle }} />
        </main>
      </div>
    </div>
  );
};

export default DatabaseLayout;
