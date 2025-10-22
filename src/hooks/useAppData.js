import { useContext } from "react";

import { AppDataContext } from "@/contexts";

const useAppData = () => {
  return useContext(AppDataContext);
};

export default useAppData;
