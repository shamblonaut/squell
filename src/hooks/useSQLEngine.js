import { useContext } from "react";

import { DatabaseContext } from "@/contexts";

const useSQLEngine = () => {
  return useContext(DatabaseContext);
};

export default useSQLEngine;
