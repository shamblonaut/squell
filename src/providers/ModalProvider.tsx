import React, { useCallback, useState } from "react";

import { ModalManager } from "@/components";
import { ModalContext } from "@/contexts";

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState<React.ReactElement | null>(null);

  const openModal = useCallback((modal: React.ReactElement) => {
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
