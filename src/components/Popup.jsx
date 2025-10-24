const Popup = ({ children, open, onClose, className }) => {
  return (
    <dialog
      open={open}
      closedby="any"
      onClose={onClose}
      className={`${className || ""} absolute z-10 top-full mt-2 min-w-full rounded-md bg-base-3 p-2 text-invert-0`}
    >
      {children}
    </dialog>
  );
};

export default Popup;
