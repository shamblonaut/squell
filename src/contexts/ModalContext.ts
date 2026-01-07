import { createContext } from "react";

export interface ModalContextValue {
  modal: React.ReactElement | null;
  openModal: (modal: React.ReactElement) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextValue | undefined>(
  undefined,
);
