/**
 * Retrieves the extension (variation) settings from the provided
 * configuration, based on incoming data.
 */
export function resolveExtension(name: any, extensions: any, data: any): any;
/**
 * A block can declare extensions and variations like:
 *
 * {
 *  variations: [
 *    {
 *      id: "summary",
 *      isDefault: true,
 *      template: Something
 *    }
 *  ],
 *  extensions: {
 *    'extensionA': {
 *      items: [
 *        // something similar to variations
 *      ]
 *    }
 *  }
 * }
 *
 * Exactly what an extension and what a variation represent is only up to the
 * block. A block should incorporate these extension mechanisms and it should
 * define what information is needed from them.
 *
 * resolveBlockExtensions will return an object with
 * `{ extensions, resolvedExtensions}`, where:
 *
 * - extensions is the blocksConfig extensions object for that block
 * - resolvedExtensions is an object with
 *   `{ variation, <someExtensionA>, <someExtensionB> }` and each of these
 *   fields hold the corresponding definition object from the block's
 *   configuration.
 */
export function resolveBlockExtensions(data: any, blocksConfig: any): {
    extensions: any;
    resolvedExtensions: any;
};
export default withBlockExtensions;
declare function withBlockExtensions(WrappedComponent: any): (props: any) => import("react/jsx-runtime").JSX.Element;
