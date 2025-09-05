const Panel = ({ title, barItems, children, className }) => {
  return (
    <div className={`${className ? className + " " : ""}flex flex-col`}>
      <div className="flex h-16 w-full items-center justify-between border-b border-base-3 bg-base-2 px-4">
        <p className="text-lg font-bold text-invert-1">{title}</p>
        <div>{barItems}</div>
      </div>
      <div className="flex flex-1 flex-col overflow-x-scroll bg-base-1">
        {children}
      </div>
    </div>
  );
};

export default Panel;
