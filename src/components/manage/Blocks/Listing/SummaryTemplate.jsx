import React from 'react';
import PropTypes from 'prop-types';
import { ConditionalLink, Component } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';

import { isInternalURL } from '@plone/volto/helpers/Url/Url';

const SummaryTemplate = ({ items, linkTitle, linkHref, isEditMode }) => {
  let link = null;
  let href = linkHref?.[0]?.['@id'] || '';

  if (isInternalURL(href)) {
    link = (
      <ConditionalLink to={flattenToAppURL(href)} condition={!isEditMode}>
        {linkTitle || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <a href={href}>{linkTitle || href}</a>;
  }

  return (
    <>
      <div className="items">
        {items.map((item) => (
          <div className="listing-item" key={item['@id']}>
            <ConditionalLink item={item} condition={!isEditMode}>
              <Component componentName="PreviewImage" item={item} alt="" />
              <div className="listing-body">
                <ul className="listing-item-ul">
                  <li>{item.title ? item.title : item.id}</li>
                </ul>
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

SummaryTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default SummaryTemplate;
