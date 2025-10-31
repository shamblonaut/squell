import { Outlet } from "react-router";

import { HeroHeader } from "@/components/headers";

const RootLayout = () => {
  return (
    <div className="flex min-h-svh flex-col">
      <HeroHeader />
      <main className="mx-auto mt-12 mb-8 flex max-w-256 flex-1 flex-col">
        <div className="flex min-w-[min(64rem,_100vw)] flex-1 flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
