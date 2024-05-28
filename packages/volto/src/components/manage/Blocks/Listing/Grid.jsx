import React from 'react';
import RenderAccordingToContentType from '@plone/volto/components/manage/Blocks/Listing/RenderAccordingToContentType';
import Link from '@plone/volto/components/manage/Blocks/Listing/Link';

const Grid = ({
  headlineTag,
  items,
  linkTitle,
  linkHref,
  isEditMode,
  variation,
}) => {
  const withImage = variation === 'grid_with_images';
  let href = linkHref?.[0]?.['@id'] || '';
  let title = linkTitle || href;
  return (
    <div className="grid-listing-template">
      <div className="grid-items">
        {items.map((item) => (
          <RenderAccordingToContentType
            isEditMode={isEditMode}
            item={item}
            grid={true}
            image={withImage}
          />
        ))}

        <Link href={href} title={title} isEditMode={isEditMode} />
      </div>
    </div>
  );
};

export default Grid;
