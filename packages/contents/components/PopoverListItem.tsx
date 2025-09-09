import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function PopoverListItem({
  className,
  children,
  ariaDescribedby,
}: {
  className?: string;
  children: React.ReactNode;
  ariaDescribedby: string;
}) {
  return (
    <li
      className={twMerge(clsx('popover-list-item py-2', className))}
      aria-describedby={ariaDescribedby}
    >
      {children}
    </li>
  );
}
