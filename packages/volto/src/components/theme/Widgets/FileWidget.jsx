import React from 'react';
import cx from 'classnames';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';

const niceBytes = (bytes) => {
  bytes = Number(bytes);

  const divider = 1024;
  const magnitude = (Math.log(bytes) / Math.log(divider)) | 0;
  const result = bytes / Math.pow(divider, magnitude);
  const fixed = result.toFixed(0);

  const suffix = magnitude ? 'kMGTPEZY'[magnitude - 1] + 'B' : 'B';

  return fixed + suffix;
};

const FileWidget = ({ value, children, className }) => {
  if (!value) {
    return '';
  }

  const url = flattenToAppURL(value.download || value.filename || value);
  const filename = value.filename || url;
  const size = value.data ? value.data.length * 0.75 : value.size || 0;
  const ctype = value['content-type'] || '';
  return (
    <UniversalLink
      title={ctype || filename}
      href={url}
      className={cx(className, 'file', 'widget')}
      data-size={size}
      data-size-fmt={niceBytes(size)}
      data-content-type={ctype}
    >
      {children ? children(filename) : filename}
    </UniversalLink>
  );
};

export default FileWidget;
