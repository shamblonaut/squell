import { useEffect, useState } from "react";

import { Database } from "@/lib/database";

import { Workspace } from "@/components";

const DashboardPage = () => {
  const [sqlLoading, setSqlLoading] = useState(true);
  const [initError, setInitError] = useState(null);

  useEffect(() => {
    Database.init()
      .catch((error) => {
        setInitError(error.message);
      })
      .finally(() => {
        setSqlLoading(false);
      });
  }, []);

  return (
    <main className="mx-auto flex flex-1 flex-col">
      {initError ? (
        <div className="mb-32 flex flex-1 flex-col justify-center text-center">
          <em>Error while initializing SQL worker:</em>
          <p className="my-2 font-[JetBrains_Mono] font-bold text-red">
            {initError}
          </p>
        </div>
      ) : sqlLoading ? (
        <div className="mb-32 flex flex-1 flex-col justify-center text-center">
          <em>Loading SQL...</em>
        </div>
      ) : (
        !sqlLoading && <Workspace />
      )}
    </main>
  );
};

export default DashboardPage;
