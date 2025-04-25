/**
 * A HOC to inject a block extension by resolving the configured extension
 */

import React from 'react';
import config from '@plone/volto/registry';

/**
 * Retrieves the extension (variation) settings from the provided
 * configuration, based on incoming data.
 */
export function resolveExtension(name, extensions, data) {
  const selectedExtension = data[name];

  let index = extensions.findIndex((conf) => conf.id === selectedExtension);

  if (index === -1) {
    index = extensions.findIndex((conf) => conf.isDefault);
  }

  return index !== -1 ? extensions[index] : undefined;
}

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
export function resolveBlockExtensions(data, blocksConfig) {
  const block_type = data['@type'];

  const { extensions = {}, variations = [] } =
    blocksConfig?.[block_type] || config.blocks.blocksConfig[block_type];

  const resolvedExtensions = Object.assign(
    {},
    ...Object.keys(extensions).map((extensionName) => ({
      [extensionName]: resolveExtension(
        extensionName,
        extensions[extensionName].items || [],
        data,
        block_type,
      ),
    })),
  );

  if (variations.length) {
    const variation = data.variation
      ? variations.find(({ id }) => id === data.variation)
      : variations.find(({ isDefault }) => isDefault);
    resolvedExtensions.variation = variation;
  }

  return { extensions, resolvedExtensions };
}

const withBlockExtensions = (WrappedComponent) => (props) => {
  const { data, blocksConfig } = props;

  const { extensions, resolvedExtensions } = resolveBlockExtensions(
    data,
    blocksConfig,
  );
  return (
    <WrappedComponent
      {...resolvedExtensions}
      {...props}
      extensions={extensions}
    />
  );
};

export default withBlockExtensions;
