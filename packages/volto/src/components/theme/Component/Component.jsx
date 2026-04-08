import registry from '@plone/volto/registry';

/**
 * A component that can automatically look up its implementation from the
 * registry based on the provided component `componentName`
 */
const Component = ({ componentName, dependencies, ...rest }) => {
  const Component = dependencies?.length
    ? registry.getComponent({ name: componentName, dependencies })?.component
    : registry.getComponent(componentName)?.component;

  if (!Component) {
    // eslint-disable-next-line no-console
    console.warn(`Component not found in registry: ${componentName}`);
    return null;
  }

  return <Component {...rest} />;
};

export default Component;
