/**
 * @typedef {Object} LoadableLib
 * @property {() => Promise<any>} import
 * @property {Object} [options]
 */
/**
 * @type {{ [key: string]: LoadableLib }}
 */
export const loadables: {
    [key: string]: LoadableLib;
};
export type LoadableLib = {
    import: () => Promise<any>;
    options?: any;
};
