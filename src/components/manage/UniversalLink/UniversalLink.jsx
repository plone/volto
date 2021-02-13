/*
 * UniversalLink
 * @module components/UniversalLink
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers/Url/Url';
import URLUtils from '@plone/volto/components/manage/AnchorPlugin/utils/URLUtils';

const UniversalLink = ({
  href,
  item,
  openLinkInNewTab,
  download = false,
  children,
  className = null,
  title = null,
  ...props
}) => {
  const token = useSelector((state) => state.userSession?.token);

  let url = href;
  if (!href) {
    url = flattenToAppURL(item['@id']);
    if (!token && item.remoteUrl) {
      url = item.remoteUrl;
    }
  }

  const isExternal = !isInternalURL(url);
  const isDownload = (!isExternal && url.includes('@@download')) || download;

  return isExternal ? (
    <a
      href={url}
      title={title}
      target={
        !URLUtils.isMail(url) && !(openLinkInNewTab === false) ? '_blank' : null
      }
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  ) : isDownload ? (
    <a href={url} download title={title} className={className} {...props}>
      {children}
    </a>
  ) : (
    <Link
      to={flattenToAppURL(url)}
      target={openLinkInNewTab ?? false ? '_blank' : null}
      title={title}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
};

UniversalLink.propTypes = {
  href: PropTypes.string,
  openLinkInNewTab: PropTypes.bool,
  download: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string,
  item: PropTypes.shape({
    '@id': PropTypes.string,
    remoteUrl: PropTypes.string, //of plone @type 'Link'
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default UniversalLink;
