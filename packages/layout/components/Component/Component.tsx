import config from '@plone/registry';

type BaseProps = {
  componentName: string;
  dependencies?: string | string[];
};

type ComponentProps<T extends object = {}> = BaseProps &
  Omit<T, keyof BaseProps>;

export function Component<T extends object>({
  componentName,
  dependencies,
  ...props
}: ComponentProps<T>) {
  const hasDependencies = dependencies !== undefined && dependencies.length > 0;

  const componentOptions = {
    name: componentName,
    dependencies: hasDependencies ? dependencies : undefined,
  };

  const RegisteredComponent = config.getComponent(componentOptions).component;

  if (!RegisteredComponent) {
    // eslint-disable-next-line no-console
    console.warn(`Component not found in registry: ${componentName}`);
    return null;
  }

  return <RegisteredComponent {...props} />;
}
