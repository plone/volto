import React from 'react';
import cx from 'classnames';

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
    isEditMode,
  } = props;

  const handleChange = React.useCallback(
    (id, image) => {
      const url = image ? image['@id'] || image : '';
      onChangeBlock(block, {
        ...data,
        url: flattenToAppURL(url),
      });
    },
    [block, onChangeBlock, data],
  );

  const imageSize = data.align === 'center' ? 'great' : 'teaser';

  return !isEditMode ? (
    <img
      className={cx(props.className, 'hero-image')}
      src={`${flattenToAppURL(data['url'])}/@@images/image/${imageSize}`}
      alt=""
    />
  ) : (
    <ImageUploadWidget
      className="hero-image"
      selected={selected}
      pathname={pathname}
      value={data['url']}
      id={id}
      imageSize={imageSize}
      onFocus={() => {
        setTimeout(() => onSelectBlock(id), 10); // too much focus stealing
      }}
      onChange={handleChange}
    />
  );
};

export default HeroImage;
