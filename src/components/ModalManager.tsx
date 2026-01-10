import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { useModal } from "@/hooks";

interface ModalManagerProps {
  open: boolean;
}

const ModalManager = ({ open }: ModalManagerProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { modal, closeModal } = useModal();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      dialog.addEventListener("close", closeModal);
    }

    return () => {
      dialog.removeEventListener("close", closeModal);
      if (!open && dialog.open) {
        dialog.close();
      }
    };
  }, [open, closeModal]);

  if (!open || !modal) return;

  return createPortal(
    <dialog
      ref={dialogRef}
      closedby="any"
      id="modal"
      className="m-auto rounded-xl border border-base-3 bg-base-1 p-4 text-invert-0 outline-none backdrop:bg-overlay backdrop:backdrop-blur-xs"
    >
      {modal}
    </dialog>,
    document.body,
  );
};

export default ModalManager;
