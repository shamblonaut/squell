import { useEffect } from "react";
import { useOutletContext } from "react-router";

import { SQLEngineSuspense, Workspace } from "@/components";
import type { DatabaseLayoutContext } from "@/layouts/DatabaseLayout";

const DatabaseQueryPage = () => {
  const { database, setPageTitle } = useOutletContext<DatabaseLayoutContext>();

  useEffect(() => {
    setPageTitle("Database Query");
  }, [setPageTitle]);

  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <SQLEngineSuspense>
        <Workspace key={database.id} />
      </SQLEngineSuspense>
    </main>
  );
};

export default DatabaseQueryPage;
