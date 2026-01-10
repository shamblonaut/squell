import type React from "react";

interface PopupProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactElement;
  rightAligned?: boolean;
  className?: string;
}

const Popup = ({
  open,
  onClose,
  children,
  rightAligned = false,
  className,
}: PopupProps) => {
  return (
    <dialog
      open={open}
      closedby="any"
      onClose={onClose}
      className={`${className || ""} ${rightAligned ? "right-0 left-auto" : "left-0 right-auto"} absolute top-full z-10 min-w-full rounded-md border border-base-4 bg-base-3 p-2 text-invert-0`}
    >
      {children}
    </dialog>
  );
};

export default Popup;
