import { AppDataProvider, ModalProvider, SQLEngineProvider } from "@/providers";
import { SQLEngineSuspense, DatabaseList } from "@/components";

const DashboardPage = () => {
  return (
    <ModalProvider>
      <AppDataProvider>
        <SQLEngineProvider>
          <h1 className="mx-8 mb-8 text-3xl font-bold">Databases</h1>
          <SQLEngineSuspense>
            <DatabaseList />
          </SQLEngineSuspense>
        </SQLEngineProvider>
      </AppDataProvider>
    </ModalProvider>
  );
};

export default DashboardPage;
