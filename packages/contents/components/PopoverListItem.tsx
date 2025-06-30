import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function PopoverListItem({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <li className={twMerge(clsx('popover-list-item py-2', className))}>
      {children}
    </li>
  );
}
