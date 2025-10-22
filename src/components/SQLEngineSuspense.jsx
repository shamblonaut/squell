import { useSQLEngine } from "@/hooks";

const SQLEngineSuspense = ({ children }) => {
  const { engineLoading, engineInitError } = useSQLEngine();

  if (engineInitError) {
    return (
      <div className="mb-32 flex flex-1 flex-col justify-center text-center">
        <em>Error while initializing SQL worker:</em>
        <p className="my-2 font-[JetBrains_Mono] font-bold text-red">
          {engineInitError}
        </p>
      </div>
    );
  } else if (engineLoading) {
    return (
      <div className="mb-32 flex flex-1 flex-col justify-center text-center">
        <em>Loading SQL Engine...</em>
      </div>
    );
  }

  return children;
};

export default SQLEngineSuspense;
