'use client';

import { cn } from '@/utils/style';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SidebarButtonProps = {
  name: string;
  href: string;
  isActive?: boolean;
};

function SidebarButton({ name, href, isActive: isActiveProp }: SidebarButtonProps) {
  const pathname = usePathname();
  const isActive = isActiveProp ?? pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'px-4 py-3 text-xs font-medium',
        isActive ? 'bg-primary-maru text-monotone-white' : 'bg-primary-egg text-monotone-black',
      )}
    >
      {name}
    </Link>
  );
}

export default SidebarButton;
