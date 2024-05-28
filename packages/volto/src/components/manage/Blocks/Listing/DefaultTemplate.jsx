import React from 'react';
import PropTypes from 'prop-types';
import RenderAccordingToContentType from '@plone/volto/components/manage/Blocks/Listing/RenderAccordingToContentType';
import Link from '@plone/volto/components/manage/Blocks/Listing/Link';

const DefaultTemplate = ({
  headlineTag,
  items,
  linkTitle,
  linkHref,
  isEditMode,
}) => {
  let href = linkHref?.[0]?.['@id'] || '';
  let title = linkTitle || href;

  const getTitleTag = (tag) => {
    const level = tag.slice(-1);
    if (/\d/.test(level)) {
      return `h${Number(level) + 1}`;
    } else {
      return 'h3';
    }
  };
  const TitleTag = headlineTag ? getTitleTag(headlineTag) : 'h3';

  return (
    <>
      <div className="items">
        {items.map((item) => (
          <RenderAccordingToContentType
            isEditMode={isEditMode}
            TitleTag={TitleTag}
            item={item}
          />
        ))}
      </div>
      <Link href={href} title={title} isEditMode={isEditMode} />
    </>
  );
};
DefaultTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};
export default DefaultTemplate;
