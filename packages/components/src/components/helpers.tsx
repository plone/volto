// @ts-ignore
export function getElementType(Component, props) {
  // Just in case we define the defaultProps in a Component
  // it will be taken into account
  const { defaultProps = {} } = Component;

  if (props.as && props.as !== defaultProps.as) return props.as;

  return defaultProps.as || 'div';
}
