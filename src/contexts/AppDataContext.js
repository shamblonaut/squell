import { createContext } from "react";

const AppDataContext = createContext({
  savedQueries: {},
});

export default AppDataContext;
