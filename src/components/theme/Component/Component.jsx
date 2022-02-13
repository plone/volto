import registry from '@plone/volto/registry';

/**
 * A component that can autommatically look up its implementation from the
 * registry based on the provided component name
 */
const Component = ({ name, ...rest }) => {
  const Component = registry.resolve(name)?.component;

  if (!Component) {
    // eslint-disable-next-line no-console
    console.warn(`Component not found in registry: ${name}`);
    return null;
  }

  return <Component {...rest} />;
};

export default Component;
