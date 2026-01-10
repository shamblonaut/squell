import type React from "react";

interface ActionButtonProps {
  icon: React.ReactElement;
  display: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}

const ActionButton = ({
  icon,
  display,
  onClick,
  disabled = false,
  className,
}: ActionButtonProps) => {
  return (
    <button
      className={`${className ? className + " " : ""}flex w-20 justify-center gap-1 rounded-sm py-1 font-bold text-slate-50 hover:text-slate-100 disabled:text-slate-300`}
      onClick={onClick}
      disabled={disabled}
    >
      {!disabled && icon}
      {display}
    </button>
  );
};

export default ActionButton;
