import React from 'react';
import PropTypes from 'prop-types';
import { ConditionalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { settings } from '~/config';

import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';
import { isInternalURL } from '@plone/volto/helpers/Url/Url';

const DefaultTemplate = ({ items, linkMore, isEditMode }) => {
  let link = null;
  let href = linkMore?.href || '';

  if (isInternalURL(href)) {
    link = (
      <ConditionalLink to={flattenToAppURL(href)} condition={!isEditMode}>
        {linkMore?.title || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <a href={href}>{linkMore?.title || href}</a>;
  }

  return (
    <>
      <div className="items">
        {items.map((item) => (
          <div className="listing-item" key={item['@id']}>
            <ConditionalLink
              to={flattenToAppURL(item['@id'])}
              condition={!isEditMode}
            >
              {!item[settings.listingPreviewImageField] && (
                <img src={DefaultImageSVG} alt="" />
              )}
              {item[settings.listingPreviewImageField] && (
                <img
                  src={flattenToAppURL(
                    item[settings.listingPreviewImageField].scales.preview
                      .download,
                  )}
                  alt={item.title}
                />
              )}
              <div className="listing-body">
                <h3>{item.title ? item.title : item.id}</h3>
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
