import React from 'react';
import clsx from 'clsx';

type SpinnerSize = 'xs' | 'sm' | 'lg';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize | number | string;
  label?: string;
  showLabel?: boolean;
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
  label = 'Loading',
  showLabel = false,
  isDecorative = false,
  className,
  style,
  ...props
}: SpinnerProps) {
  const sizeProps = toSpinnerSize(size);
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
      {!isDecorative && showLabel && (
        <span className="spinner-label">{label}</span>
      )}
      {!isDecorative && !showLabel && <span className="sr-only">{label}</span>}
    </div>
  );
}
