import { useOutletContext } from "react-router";

const SQLEngineSuspense = ({ children }) => {
  const { sqlLoading, sqlInitError } = useOutletContext();

  if (sqlInitError) {
    return (
      <div className="mb-32 flex flex-1 flex-col justify-center text-center">
        <em>Error while initializing SQL worker:</em>
        <p className="my-2 font-[JetBrains_Mono] font-bold text-red">
          {sqlInitError}
        </p>
      </div>
    );
  } else if (sqlLoading) {
    return (
      <div className="mb-32 flex flex-1 flex-col justify-center text-center">
        <em>Loading SQL Engine...</em>
      </div>
    );
  }

  return children;
};

export default SQLEngineSuspense;
