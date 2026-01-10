import { Box } from "lucide-react";

import { SQLEngineSuspense, Workspace } from "@/components";
import { PageHeader } from "@/components/headers";

const SandboxPage = () => {
  return (
    <div className="flex min-h-svh flex-col">
      <PageHeader
        title={
          <div className="flex items-center gap-2 text-2xl font-medium text-invert-0">
            <Box className="h-auto w-6" /> Sandbox
          </div>
        }
      />
      <main className="flex flex-1 flex-col">
        <SQLEngineSuspense>
          <Workspace config={{ sandbox: true }} />
        </SQLEngineSuspense>
      </main>
    </div>
  );
};

export default SandboxPage;
