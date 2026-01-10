import { DatabaseList, SQLEngineSuspense } from "@/components";

const DashboardPage = () => {
  return (
    <>
      <h1 className="mx-8 mb-8 text-3xl font-bold">Databases</h1>
      <SQLEngineSuspense>
        <DatabaseList />
      </SQLEngineSuspense>
    </>
  );
};

export default DashboardPage;
