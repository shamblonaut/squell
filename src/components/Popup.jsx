const Popup = ({ children, open, onClose }) => {
  return (
    <dialog
      open={open}
      closedby="any"
      onClose={onClose}
      className="absolute top-full mt-2 min-w-full rounded-md p-2 bg-base-3 text-invert-0"
    >
      {children}
    </dialog>
  );
};

export default Popup;
