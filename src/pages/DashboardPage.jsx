import { useEffect, useState } from "react";

import { Database } from "@/lib/database";

import { Header, Workspace } from "@/components";

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
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="mx-auto flex flex-1 flex-col">
        {initError ? (
          <div className="mb-32 flex flex-1 flex-col justify-center text-center">
            <em>Error while initializing SQL worker:</em>
            <p className="my-2 font-[JetBrains_Mono] font-bold text-red-400">
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
    </div>
  );
};

export default DashboardPage;
