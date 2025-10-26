import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router";
import { LayoutDashboard } from "lucide-react";

import { SQLiteDBManager } from "@/lib/sqlite";

import { useAppData, useSQLEngine } from "@/hooks";

import { Sidebar } from "@/components";
import { DatabaseHeader } from "@/components/headers";

const DatabaseLayout = () => {
  const { dbId } = useParams();

  const { dbData } = useAppData();
  const { database, setDatabase, engineLoading, engineInitError } =
    useSQLEngine();

  const [databaseError, setDatabaseError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    () => window.innerWidth >= 1024,
  );

  useEffect(() => {
    let altPressed = false;
    const keyDownHandler = (event) => {
      if (event.key === "Alt") {
        altPressed = true;
      }

      if (altPressed && event.key === "s") {
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

  useEffect(() => {
    if (!dbData || engineLoading || engineInitError) {
      return;
    }

    let manager;
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
      <main className="flex flex-col h-svh items-center justify-center text-center px-4">
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
      <main className="flex flex-col h-svh items-center justify-center text-center px-4">
        <div className="m-8 text-center">
          <p className="text-2xl font-medium">Loading Database...</p>
        </div>
      </main>
    );
  }

  return (
    <div className="flex min-h-svh">
      <Sidebar open={isSidebarOpen} close={() => setIsSidebarOpen(false)} />
      <div className="flex flex-col flex-1">
        <DatabaseHeader
          title="Database Query"
          isSidebarOpen={isSidebarOpen}
          openSidebar={() => setIsSidebarOpen(true)}
        />
        <main className="flex-1 flex flex-col">
          <Outlet context={{ database }} />
        </main>
      </div>
    </div>
  );
};

export default DatabaseLayout;
