import React from 'react';
import cx from 'classnames';
import { flattenToAppURL } from '@plone/volto/helpers';

const RelationWidget = ({ value, children, className }) => {
  if (!value) {
    return '';
  }

  const url = flattenToAppURL(value['@id'] || '#');
  const state = value.review_state || '';
  const description = value.description || '';
  const type = value['@type'] || '';

  return (
    <a
      href={url}
      className={cx(className, 'relation', 'widget', type, state)}
      title={description}
    >
      {children
        ? children(value?.title || value?.token || value)
        : value?.title || value?.token || value}
    </a>
  );
};

export default RelationWidget;
