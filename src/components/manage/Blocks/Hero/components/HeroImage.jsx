import React from 'react';
import { flattenToAppURL } from '@plone/volto/helpers';

import { ImageUploadWidget } from '@plone/volto/components';

const HeroImage = (props) => {
  const {
    id,
    data,
    block,
    pathname,
    onChangeBlock,
    onSelectBlock,
    selected,
  } = props;

  return (
    <ImageUploadWidget
      className="hero-image"
      selected={selected}
      pathname={pathname}
      value={data['url']}
      id={id}
      onFocus={() => {
        setTimeout(() => onSelectBlock(id), 10); // too much focus stealing
      }}
      onChange={(id, image) => {
        const url = image ? image['@id'] : '';
        onChangeBlock(block, {
          ...data,
          url: flattenToAppURL(url),
        });
      }}
    />
  );
};

export default HeroImage;
