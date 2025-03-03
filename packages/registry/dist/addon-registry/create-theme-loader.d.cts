declare function nameFromPackage(name: string): string;
declare function getThemeLoaderCode(name: string, customThemeAddons?: Array<string>): string;
declare function createThemeAddonsLoader({ main, variables, }: {
    main: string[];
    variables: string[];
}): string[];

export { createThemeAddonsLoader, getThemeLoaderCode, nameFromPackage };
