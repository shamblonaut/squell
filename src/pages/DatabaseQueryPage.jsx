import { useOutletContext } from "react-router";

import { Workspace, SQLEngineSuspense } from "@/components";

const DatabaseQueryPage = () => {
  const { database } = useOutletContext();

  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <SQLEngineSuspense>
        <Workspace key={database.id} database={database} />
      </SQLEngineSuspense>
    </main>
  );
};

export default DatabaseQueryPage;
