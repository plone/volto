import { tv } from 'tailwind-variants';
import { focusRing } from '../utils';

export const link = tv({
  extend: focusRing,
  base: 'rounded-xs underline transition disabled:cursor-default disabled:no-underline forced-colors:disabled:text-[GrayText]',
  variants: {
    variant: {
      primary:
        'text-quanta-sapphire decoration-quanta-sapphire/40 hover:decoration-quanta-royal hover:text-quanta-royal active:text-quanta-cobalt active:decoration-quanta-cobalt focus:decoration-quanta-royal focus:text-quanta-royal underline',
      secondary:
        'text-gray-700 underline decoration-gray-700/50 hover:decoration-gray-700',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});
