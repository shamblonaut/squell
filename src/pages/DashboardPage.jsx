import { useEffect, useState } from "react";

import { useSQL } from "@/hooks";

import { Header, Workspace } from "@/components";

const DashboardPage = () => {
  const { SQL, error: initError, loading: sqlLoading } = useSQL();

  const [database, setDatabase] = useState();

  useEffect(() => {
    if (!SQL) return;

    setDatabase(new SQL.Database());
  }, [SQL, sqlLoading]);

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="mx-auto flex-1">
        {sqlLoading
          ? "Loading SQL..."
          : initError
            ? initError.message
            : !SQL && "Could not load SQL"}
        {database && <Workspace db={database} />}
      </main>
    </div>
  );
};

export default DashboardPage;
