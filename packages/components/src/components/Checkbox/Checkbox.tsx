import cx from 'classnames';
import type { CheckboxProps as RACCheckboxProps } from 'react-aria-components';
import { Checkbox as RACCheckbox, Text } from 'react-aria-components';

interface CheckboxProps extends RACCheckboxProps {
  title?: string;
  description?: string;
  error?: string[];
}

export default function Checkbox({
  children,
  title,
  error,
  description,
  ...props
}: CheckboxProps) {
  console.log(error);
  return (
    <>
      <div className={cx('q field', `field-${props.name}`)}>
        <RACCheckbox {...props}>
          {({ isIndeterminate }) => (
            <>
              <div className="checkbox">
                <svg viewBox="0 0 18 18" aria-hidden="true">
                  {isIndeterminate ? (
                    <rect x={1} y={7.5} width={15} height={3} />
                  ) : (
                    <polyline points="1 9 7 14 15 4" />
                  )}
                </svg>
              </div>
              {title || children}
            </>
          )}
        </RACCheckbox>
        {props.isInvalid && (
          <Text className="q assist" slot="errorMessage">
            {error}
          </Text>
        )}
        {description && (
          <Text slot="description" className="q hint">
            {description}
          </Text>
        )}
      </div>
    </>
  );
}
