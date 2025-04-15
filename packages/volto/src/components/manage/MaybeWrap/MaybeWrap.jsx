import React from 'react';

export default function MaybeWrap({
  condition,
  as: Component = 'div',
  ...props
}) {
  return condition ? <Component {...props} /> : props.children;
}
