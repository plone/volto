/*
 * UniversalLink
 * @module components/UniversalLink
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
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
  stripHash = false,
  delay = 0,
  offset = null,
  onClick = () => {},
  ...props
}) => {
  const history = useHistory();
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
      url = flattenToAppURL(item['@id']);
      if (!token && item.remoteUrl) {
        url = item.remoteUrl;
      }
    }
  }

  const isBlacklisted =
    (config.settings.externalRoutes ?? []).find((route) =>
      matchPath(flattenToAppURL(url), route.match),
    )?.length > 0;
  const isExternal = !isInternalURL(url) || isBlacklisted;
  const isDownload = (!isExternal && url.includes('@@download')) || download;
  const appUrl = flattenToAppURL(url);

  const path = stripHash ? appUrl.split('#')[0] : appUrl;
  const hash = appUrl.split('#')[1];

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
    <a href={appUrl} download title={title} className={className} {...props}>
      {children}
    </a>
  ) : (
    <Link
      to={path}
      target={openLinkInNewTab ?? false ? '_blank' : null}
      title={title}
      className={className}
      onClick={(e) => {
        if (typeof onClick === 'function') {
          onClick();
          if (!hash) return;
        }
        e.preventDefault();
        if (delay) {
          setTimeout(() => {
            history.push(stripHash ? path : appUrl, {
              volto_scroll_hash: hash,
              volto_scroll_offset:
                typeof offset === 'function' ? offset() : offset,
            });
          }, delay);
        } else {
          history.push(stripHash ? path : appUrl, {
            volto_scroll_hash: hash,
            volto_scroll_offset:
              typeof offset === 'function' ? offset() : offset,
          });
        }
      }}
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
  stripHash: PropTypes.bool,
  delay: PropTypes.number, // ms
  offset: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default UniversalLink;
