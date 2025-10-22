import { useCallback, useState } from "react";

import { ModalContext } from "@/contexts";

import { ModalManager } from "@/components";

const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState(null);

  const openModal = useCallback((modal) => {
    setModal(modal);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
    setIsModalOpen(false);
  }, []);

  return (
    <ModalContext value={{ modal, openModal, closeModal }}>
      {children}
      <ModalManager open={isModalOpen} />
    </ModalContext>
  );
};

export default ModalProvider;
