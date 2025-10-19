import { Workspace, SQLEngineSuspense } from "@/components";

const SandboxPage = () => {
  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <SQLEngineSuspense>
        <Workspace config={{ sandbox: true }} />
      </SQLEngineSuspense>
    </main>
  );
};

export default SandboxPage;
