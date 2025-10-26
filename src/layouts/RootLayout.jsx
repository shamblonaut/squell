import { Outlet } from "react-router";

import { HeroHeader } from "@/components/headers";

const RootLayout = () => {
  return (
    <div className="flex min-h-svh flex-col">
      <HeroHeader />
      <main className="flex-1 flex flex-col mx-auto mt-12 mb-8 max-w-256">
        <div className="flex-1 flex flex-col min-w-[min(64rem,_100vw)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
