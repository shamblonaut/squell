const Popup = ({
  children,
  open,
  onClose,
  rightAligned = false,
  className,
}) => {
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
