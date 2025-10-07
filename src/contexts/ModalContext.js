import { createContext } from "react";

const ModalContext = createContext({
  type: "",
  open: () => {},
  close: () => {},
});

export default ModalContext;
