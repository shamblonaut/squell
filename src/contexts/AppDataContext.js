import { createContext } from "react";

const AppDataContext = createContext({
  savedQueries: {},
  dbData: {},
});

export default AppDataContext;
