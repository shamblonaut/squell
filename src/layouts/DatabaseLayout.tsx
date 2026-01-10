import { LayoutDashboard } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router";

import { Sidebar } from "@/components";
import { DatabaseHeader } from "@/components/headers";
import type { SQLEngineDatabase } from "@/contexts";
import { useAppData, useSQLEngine } from "@/hooks";
import { SQLiteDBManager } from "@/lib/sqlite";

export interface DatabaseLayoutContext {
  database: SQLEngineDatabase;
  setPageTitle: React.Dispatch<React.SetStateAction<string>>;
}

const DatabaseLayout = () => {
  const { dbId } = useParams();

  const { dbData } = useAppData();
  const { database, setDatabase, engineLoading, engineInitError } =
    useSQLEngine();

  const [pageTitle, setPageTitle] = useState("Database");
  const [databaseError, setDatabaseError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    () => window.innerWidth >= 1024,
  );

  // TODO: Handle keybinds in a better way
  useEffect(() => {
    let altPressed = false;
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Alt") {
        altPressed = true;
      }

      if (altPressed && event.key === "s") {
        setIsSidebarOpen((isOpen) => !isOpen);
      }
    };

    const keyUpHandler = (event: KeyboardEvent) => {
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

  useEffect(() => {
    if (!dbData || engineLoading || engineInitError) {
      return;
    }

    let manager: SQLiteDBManager;
    dbData.getRecord(Number(dbId)).then((record) => {
      if (!record) {
        setDatabaseError("Database not found");
        return;
      }

      manager = new SQLiteDBManager(record.data);
      manager.getTables().then((tables) => {
        setDatabase({
          id: Number(dbId),
          name: record.name,
          tables,
          manager,
        });
        setDatabaseError(null);
      });
    });

    return () => {
      if (manager) manager.close();
      setDatabase(null);
    };
  }, [
    dbId,
    dbData,
    engineLoading,
    engineInitError,
    setDatabase,
    setDatabaseError,
  ]);

  if (databaseError) {
    return (
      <main className="flex h-svh flex-col items-center justify-center px-4 text-center">
        <h2 className="m-4 text-4xl font-bold">Database Error</h2>
        <div className="m-8 text-center text-red">
          <p className="text-3xl font-bold">Error:</p>
          <p className="text-2xl font-medium">{databaseError}</p>
        </div>
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
