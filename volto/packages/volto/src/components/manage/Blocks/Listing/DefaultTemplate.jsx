import React from 'react';
import PropTypes from 'prop-types';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers/Url/Url';

const DefaultTemplate = ({
  headlineTag,
  items,
  linkTitle,
  linkHref,
  isEditMode,
}) => {
  let link = null;
  let href = linkHref?.[0]?.['@id'] || '';

  if (isInternalURL(href)) {
    link = (
      <ConditionalLink to={flattenToAppURL(href)} condition={!isEditMode}>
        {linkTitle || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <UniversalLink href={href}>{linkTitle || href}</UniversalLink>;
  }

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
          <div className="listing-item" key={item['@id']}>
            <ConditionalLink item={item} condition={!isEditMode}>
              <div className="listing-body">
                <TitleTag>{item.title ? item.title : item.id}</TitleTag>
                <p>{item.description}</p>
              </div>
            </ConditionalLink>
          </div>
        ))}
      </div>

      {link && <div className="footer">{link}</div>}
    </>
  );
};
DefaultTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};
export default DefaultTemplate;
