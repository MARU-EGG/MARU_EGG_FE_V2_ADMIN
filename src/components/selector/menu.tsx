'use client';

import { useSelectorContext } from './selector-context';

type menuProps = {
  children?: React.ReactNode;
  value: string;
  label: string;
  onClick?: (value: string, label: string) => void;
};

function Menu({ children, onClick, value, label }: menuProps) {
  const { setIsOpen, setTriggerLabel } = useSelectorContext();

  const handleClick = () => {
    setTriggerLabel(label);
    setIsOpen(false);
    onClick && onClick(value, label);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-default rounded-md px-3 py-3 text-sm font-semibold leading-tight text-grayscale-gray-70 hover:bg-monotone-black hover:bg-opacity-[0.08]"
    >
      {label}
      {children && <>{children}</>}
    </div>
  );
}

export default Menu;
