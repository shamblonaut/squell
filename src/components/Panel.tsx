interface PanelProps {
  title: string;
  barItems: React.ReactElement;
  children: React.ReactElement;
  className?: string;
}

const Panel = ({ title, barItems, children, className }: PanelProps) => {
  return (
    <div className={`${className ? className + " " : ""}flex flex-col`}>
      <div className="flex h-16 w-full items-center justify-between border-b border-base-3 bg-base-2 px-4">
        <p className="text-lg font-bold text-invert-1">{title}</p>
        <div className="grid grid-flow-col gap-2">{barItems}</div>
      </div>
      <div className="flex flex-1 flex-col overflow-x-auto bg-base-1">
        {children}
      </div>
    </div>
  );
};

export default Panel;
