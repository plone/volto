/**
 * A HOC to inject a block extension by resolving the configured extension
 */

import React from 'react';
import config from '@plone/volto/registry';

export function resolveExtension(name, extensions, data) {
  const selectedExtension = data[name];

  let index = extensions.findIndex((conf) => conf.id === selectedExtension);

  if (index === -1) {
    index = extensions.findIndex((conf) => conf.isDefault);
  }

  return index !== -1 ? extensions[index] : undefined;
}

export default (WrappedComponent) => (props) => {
  const { data } = props;
  const block_type = data['@type'];
  const { extensions = {} } = config.blocks.blocksConfig[block_type];

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

  return (
    <WrappedComponent
      {...resolvedExtensions}
      {...props}
      extensions={extensions}
    />
  );
};
