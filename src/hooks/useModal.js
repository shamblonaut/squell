import { useContext } from "react";

import { ModalContext } from "@/contexts";

const useModal = () => {
  return useContext(ModalContext);
};

export default useModal;
