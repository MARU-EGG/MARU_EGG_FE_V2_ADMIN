'use client';

import { useSelectorContext } from './selector-context';

type menuProps = {
  children: string;
  onClick?: (event?: React.MouseEvent<HTMLDivElement>) => void;
};

function Menu({ children, onClick }: menuProps) {
  const { setIsOpen, setTriggerLabel } = useSelectorContext();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setTriggerLabel(children);
    setIsOpen(false);
    onClick && onClick(event);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-default rounded-md px-3 py-3 text-sm font-semibold leading-tight text-grayscale-gray-70 hover:bg-monotone-black hover:bg-opacity-[0.08]"
    >
      {children}
    </div>
  );
}

export default Menu;
