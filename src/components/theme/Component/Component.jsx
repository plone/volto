import registry from '@plone/volto/registry';

/**
 * A component that can autommatically look up its implementation from the
 * registry based on the provided component `componentName`
 */
const Component = ({ componentName, ...rest }) => {
  const Component = registry.resolve(componentName)?.component;

  if (!Component) {
    // eslint-disable-next-line no-console
    console.warn(`Component not found in registry: ${componentName}`);
    return null;
  }

  return <Component {...rest} />;
};

export default Component;
