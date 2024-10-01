import React from 'react';
import PropTypes from 'prop-types';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { isInternalURL } from '@plone/volto/helpers/Url/Url';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';

const LinkMore = ({ data, isEditMode }) => {
  let href = data.linkHref?.[0]?.['@id'] || '';
  let link = null;
  if (isInternalURL(href)) {
    link = (
      <ConditionalLink to={flattenToAppURL(href)} condition={!isEditMode}>
        {data.linkTitle || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <UniversalLink href={href}>{data.linkTitle || href}</UniversalLink>;
  }

  return link ? <div className="link-more">{link}</div> : null;
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
LinkMore.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default LinkMore;
