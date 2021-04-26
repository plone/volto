/**
 * A HOC to inject a block extension by resolving the configured extension
 */

import React from 'react';
import config from '@plone/volto/registry';

export function resolveExtension(name, extensions, data, block_type) {
  const selectedExtension = data[name] || 'default';

  const index = extensions.findIndex((conf) => conf.id === selectedExtension);

  if (index === -1) {
    throw new Error(
      `You need to register the default extension for block types: ${block_type}`,
    );
  }
  const extension = extensions[index];

  return extension;
}

export default (WrappedComponent) => (props) => {
  const { data } = props;
  const block_type = data['@type'];
  const { extensions = {} } = config.blocks.blocksConfig[block_type];

  const resolvedExtensions = Object.assign(
    {},
    Object.keys(extensions).map((extensionName) => ({
      [extensionName]: resolveExtension(
        extensionName,
        extensions[extensionName],
        data,
        block_type,
      ),
    })),
  );

  return (
    <WrappedComponent
      {...props}
      {...resolvedExtensions}
      extensions={extensions}
    />
  );
};
