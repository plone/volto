import React from 'react';
import PropTypes from 'prop-types';
import RenderAccordingToContentType from '@plone/volto/components/manage/Blocks/Listing/RenderAccordingToContentType';
import Link from '@plone/volto/components/manage/Blocks/Listing/Link';

const SummaryTemplate = ({ items, linkTitle, linkHref, isEditMode }) => {
  let href = linkHref?.[0]?.['@id'] || '';
  let title = linkTitle || href;

  return (
    <>
      <div className="items">
        {items.map((item) => (
          <div className="listing-item" key={item['@id']}>
            <RenderAccordingToContentType
              isEditMode={isEditMode}
              item={item}
              image={true}
            />
          </div>
        ))}
      </div>

      <Link href={href} title={title} isEditMode={isEditMode} />
    </>
  );
};

SummaryTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default SummaryTemplate;
