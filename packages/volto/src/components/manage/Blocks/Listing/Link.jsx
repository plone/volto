import React from 'react';
import { ConditionalLink } from '@plone/volto/components';
import { isInternalURL, flattenToAppURL } from '@plone/volto/helpers';

const Link = ({ href, title, isEditMode }) => {
  let link = null;
  if (isInternalURL(href)) {
    link = (
      <ConditionalLink
        to={flattenToAppURL(href)}
        condition={!isEditMode}
        className="ui button"
      >
        {title || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <a href={href}>{title || href}</a>;
  }
  return <>{link && <div className="block-footer">{link}</div>}</>;
};

export default Link;
