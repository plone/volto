import React, { ComponentPropsWithoutRef } from 'react';

type MaybeWrapProps<T extends React.ElementType> = {
  condition: boolean;
  as: T;
} & ComponentPropsWithoutRef<React.ElementType extends T ? 'div' : T>;

function MaybeWrap<T extends React.ElementType = 'div'>(
  props: MaybeWrapProps<T>,
) {
  const { as: Component = 'div', condition, ...rest } = props;
  return condition ? <Component {...rest} /> : props.children;
}

export default MaybeWrap;
