import React from 'react';
import cx from 'classnames';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Image } from '@plone/volto/components';

const niceBytes = (bytes) => {
  bytes = Number(bytes);

  const divider = 1024;
  const magnitude = (Math.log(bytes) / Math.log(divider)) | 0;
  const result = bytes / Math.pow(divider, magnitude);
  const fixed = result.toFixed(0);

  const suffix = magnitude ? 'kMGTPEZY'[magnitude - 1] + 'B' : 'B';

  return fixed + suffix;
};

const ImageWidget = ({ value, className }) =>
  value ? (
    <span className={cx(className, 'image', 'widget')}>
      <Image
        src={
          value.data
            ? `data:${value['content-type']};base64,${value.data}`
            : flattenToAppURL(value.download || '')
        }
        alt={value.file_name || ''}
        data-size={value.size || 0}
        data-size-fmt={niceBytes(value.size || 0)}
        data-content-type={value['content-type'] || ''}
      />
    </span>
  ) : (
    ''
  );

export default ImageWidget;
