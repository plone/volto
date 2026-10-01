import React from 'react';
import clsx from 'clsx';

type SpinnerSize = 'xs' | 'sm' | 'lg';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize | number | string;
  label?: string | null;
  isDecorative?: boolean;
}

function toSpinnerSize(size: SpinnerProps['size']) {
  if (size === undefined) return { dataSize: 'sm' };
  if (size === 'xs' || size === 'sm' || size === 'lg') {
    return { dataSize: size };
  }
  if (typeof size === 'number') return { customSize: `${size}px` };
  return { customSize: size };
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
  const sizeProps = toSpinnerSize(size);
  const hasLabel =
    !isDecorative && typeof label === 'string' && label.length > 0;
  const ariaLabel = isDecorative
    ? undefined
    : ariaLabelProp ??
      (typeof label === 'string' && label.length > 0 ? label : 'Loading');
  const mergedStyle = {
    ...style,
    ...(sizeProps.customSize
      ? ({ '--spinner-size': sizeProps.customSize } as React.CSSProperties)
      : {}),
  };

  return (
    <div
      {...props}
      className={clsx('react-aria-Spinner', className)}
      style={mergedStyle}
      data-size={sizeProps.dataSize}
      aria-label={ariaLabel}
      {...(isDecorative
        ? { 'aria-hidden': true }
        : { role: 'status', 'aria-live': 'polite' })}
    >
      <svg
        className="spinner-svg"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle className="spinner-track" cx="12" cy="12" r="9" />
        <circle className="spinner-indicator" cx="12" cy="12" r="9" />
      </svg>
      {hasLabel && <span className="spinner-label">{label}</span>}
    </div>
  );
}
