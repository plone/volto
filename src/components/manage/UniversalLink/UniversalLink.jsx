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
import { matchPath } from 'react-router';

import config from '@plone/volto/registry';

const UniversalLink = ({
  href,
  item = null,
  openLinkInNewTab,
  download = false,
  children,
  className = null,
  title = null,
  ...props
}) => {
  const token = useSelector((state) => state.userSession?.token);

  let url = href;
  if (!href && item) {
    if (!item['@id']) {
      // eslint-disable-next-line no-console
      console.error(
        'Invalid item passed to UniversalLink',
        item,
        props,
        children,
      );
      url = '#';
    } else {
      //case: generic item
      url = flattenToAppURL(item['@id']);

      //case: item like a Link
      if (!token && item.remoteUrl) {
        url = item.remoteUrl;
      }

      //case: item of type 'File'
      if (!token && item['@type'] === 'File') {
        url = `${url}/@@download/file`;
      }
    }
  }

  const isBlacklisted =
    (config.settings.externalRoutes ?? []).find((route) =>
      matchPath(flattenToAppURL(url), route.match),
    )?.length > 0;
  const isExternal = !isInternalURL(url) || isBlacklisted;
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
    <a
      href={flattenToAppURL(url)}
      download
      title={title}
      className={className}
      {...props}
    >
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
    '@id': PropTypes.string.isRequired,
    remoteUrl: PropTypes.string, //of plone @type 'Link'
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default UniversalLink;
