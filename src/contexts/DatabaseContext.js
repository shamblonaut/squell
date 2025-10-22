import { createContext } from "react";

const DatabaseContext = createContext({
  id: 0,
  name: "",
  manager: {},
  tables: [],
});

export default DatabaseContext;
