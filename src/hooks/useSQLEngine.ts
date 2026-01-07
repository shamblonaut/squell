import { useContext } from "react";

import { SQLEngineContext } from "@/contexts";

const useSQLEngine = () => {
  const context = useContext(SQLEngineContext);
  if (!context) {
    throw new Error("useSQLEngine must be used within an SQLEngineProvider");
  }

  return context;
};

export default useSQLEngine;
