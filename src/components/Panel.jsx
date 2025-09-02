const Panel = ({ title, barItems, children, className }) => {
  return (
    <div className={`${className} flex flex-col`}>
      <div className="flex h-16 w-full items-center justify-between border-b border-gray-600 bg-gray-800 px-4">
        <p className="text-lg font-bold">{title}</p>
        <div>{barItems}</div>
      </div>
      <div className="flex-1 overflow-x-scroll">{children}</div>
    </div>
  );
};

export default Panel;
