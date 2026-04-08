export default Component;
/**
 * A component that can automatically look up its implementation from the
 * registry based on the provided component `componentName`
 */
declare function Component({ componentName, dependencies, ...rest }: {
    [x: string]: any;
    componentName: any;
    dependencies: any;
}): import("react/jsx-runtime").JSX.Element;
