import React from 'react';
import PropTypes from 'prop-types';
import { ConditionalLink, Component } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { List } from 'semantic-ui-react';

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
        <List role="list">
          {items.map((item) => (
            <List.Item key={item['@id']}>
              <div
                className={`listing-item ${
                  item.review_state ? `state-${item.review_state}` : ''
                }`}
                role="listitem"
              >
                <ConditionalLink item={item} condition={!isEditMode}>
                  <Component componentName="PreviewImage" item={item} alt="" />
                  <div className="listing-body">
                    <List.Header className="summary-listing-item-header">
                      {item.title ? item.title : item.id}
                    </List.Header>
                    <p>{item.description}</p>
                  </div>
                </ConditionalLink>
              </div>
            </List.Item>
          ))}
        </List>
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
