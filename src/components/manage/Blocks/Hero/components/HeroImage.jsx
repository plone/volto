import React from 'react';
import { flattenToAppURL } from '@plone/volto/helpers';

import { ImageUploadWidget } from '@plone/volto/components';
import useWhyDidYouUpdate from '@plone/volto/helpers/Utils/useWhyDidYouUpdate';

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

  const handleChange = React.useCallback(
    (id, image) => {
      const url = image ? image['@id'] : '';
      onChangeBlock(block, {
        ...data,
        url: flattenToAppURL(url),
      });
    },
    [block, onChangeBlock, data],
  );

  // useWhyDidYouUpdate('HeroImage', { block, onChangeBlock, data });

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
      onChange={handleChange}
    />
  );
};

export default HeroImage;
