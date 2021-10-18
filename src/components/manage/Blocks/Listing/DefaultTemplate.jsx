import React from 'react';
import PropTypes from 'prop-types';
import { ConditionalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';

import { isInternalURL } from '@plone/volto/helpers/Url/Url';

const DefaultTemplate = ({
  items,
  linkTitle,
  linkHref,
  isEditMode,
  variationTitle,
  variationDescription,
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
    link = <a href={href}>{linkTitle || href}</a>;
  }
  return (
    <>
      <div className="items">
        {items.map((item) => (
          <div className="listing-item" key={item['@id']}>
            <ConditionalLink item={item} condition={!isEditMode}>
              <div className="listing-body">
                <h4>
                  {variationTitle &&
                  typeof item[variationTitle] != 'object' &&
                  item[variationTitle] != null
                    ? item[variationTitle]
                    : item.title
                    ? item.title
                    : item.id}
                </h4>
                <p>
                  {variationDescription &&
                  typeof item[variationDescription] != 'object' &&
                  item[variationDescription] != null
                    ? item[variationDescription]
                    : item.description
                    ? item.description
                    : item.id}
                </p>
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
