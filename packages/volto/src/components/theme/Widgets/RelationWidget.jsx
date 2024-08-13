import React from 'react';
import cx from 'classnames';
import { flattenToAppURL } from '@plone/volto/helpers';
import { getContentIcon } from '@plone/volto/helpers';
import { Icon } from '@plone/volto/components';
import { UniversalLink } from '@plone/volto/components';

const RelationWidget = ({ value, children, className }) => {
  if (!value) {
    return '';
  }

  const url = flattenToAppURL(value['@id'] || '#');
  const state = value.review_state || '';
  const description = value.description || '';
  const type = value['@type'] || '';

  return (
    <UniversalLink
      href={url}
      className={cx(className, 'relation', 'widget', type, state)}
      title={description}
    >
      <Icon
        name={getContentIcon(type, value.is_folderish)}
        size="20px"
        className="icon-margin"
        color="#878f93"
        title={type}
      />
      {children
        ? children(value?.title || value?.token || value)
        : value?.title || value?.token || value}
    </UniversalLink>
  );
};

export default RelationWidget;
