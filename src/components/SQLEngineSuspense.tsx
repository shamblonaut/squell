import type React from "react";

import { useSQLEngine } from "@/hooks";

interface SQLEngineSuspenseProps {
  children: React.ReactElement;
}

const SQLEngineSuspense = ({ children }: SQLEngineSuspenseProps) => {
  const { isLoading: isEngineLoading, error: engineError } = useSQLEngine();

  if (engineError) {
    return (
      <div className="mb-32 flex flex-1 flex-col justify-center text-center">
        <em>Error while initializing SQL worker:</em>
        <p className="my-2 font-[JetBrains_Mono] font-bold text-red">
          {engineError.message}
        </p>
      </div>
    );
  } else if (isEngineLoading) {
    return (
      <div className="mb-32 flex flex-1 flex-col justify-center text-center">
        <em>Loading SQL Engine...</em>
      </div>
    );
  }

  return children;
};

export default SQLEngineSuspense;
