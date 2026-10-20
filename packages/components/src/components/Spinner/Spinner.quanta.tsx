import React from 'react';
import clsx from 'clsx';
import { tv } from 'tailwind-variants';

type SpinnerSize = 'xs' | 'sm' | 'lg';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize | number | string;
  label?: string | null;
  isDecorative?: boolean;
}

const wrapperStyles = tv({
  base: 'inline-flex items-center gap-2 text-quanta-iron',
});

const spinnerStyles = tv({
  base: `
    animate-spin
    motion-reduce:animate-none
  `,
  variants: {
    size: {
      xs: 'size-4',
      sm: 'size-6',
      lg: 'size-8',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

function isPresetSize(size: SpinnerProps['size']): size is SpinnerSize {
  return size === 'xs' || size === 'sm' || size === 'lg';
}

function resolveCustomSize(size: SpinnerProps['size']) {
  if (typeof size === 'number') return `${size}px`;
  if (typeof size === 'string' && !isPresetSize(size)) {
    return size;
  }
  return undefined;
}

export function Spinner({
  size = 'sm',
  label = null,
  isDecorative = false,
  className,
  style,
  'aria-label': ariaLabelProp,
  ...props
}: SpinnerProps) {
  const hasLabel =
    !isDecorative && typeof label === 'string' && label.length > 0;
  const ariaLabel = isDecorative
    ? undefined
    : ariaLabelProp ??
      (typeof label === 'string' && label.length > 0 ? label : 'Loading');
  const customSize = resolveCustomSize(size);
  const presetSize = isPresetSize(size) ? size : 'sm';

  return (
    <div
      {...props}
      className={wrapperStyles({ className: clsx(className) })}
      style={style}
      aria-label={ariaLabel}
      {...(isDecorative
        ? { 'aria-hidden': true }
        : { role: 'status', 'aria-live': 'polite' })}
    >
      <svg
        className={spinnerStyles({ size: presetSize })}
        style={
          customSize
            ? ({ width: customSize, height: customSize } as React.CSSProperties)
            : undefined
        }
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="3"
          opacity="0.2"
        />
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="42 57"
        />
      </svg>
      {hasLabel && <span className="text-sm">{label}</span>}
    </div>
  );
}
