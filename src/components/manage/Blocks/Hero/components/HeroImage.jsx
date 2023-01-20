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
        console.log('focus');
        onSelectBlock(id);
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
