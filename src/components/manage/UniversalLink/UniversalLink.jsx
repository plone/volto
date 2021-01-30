/*
 * UniversalLink
 * @module components/UniversalLink
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';
import URLUtils from '@plone/volto/components/manage/AnchorPlugin/utils/URLUtils';

const UniversalLink = ({
  href,
  openLinkInNewTab,
  download = false,
  children,
  className = null,
  title = null,
  ...props
}) => {
  const isExternal = !isInternalURL(href);
  const isDownload = (!isExternal && href.includes('@@download')) || download;

  return isExternal ? (
    <a
      href={href}
      title={title}
      target={
        !URLUtils.isMail(href) && !(openLinkInNewTab === false)
          ? '_blank'
          : null
      }
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  ) : isDownload ? (
    <a href={href} download title={title} className={className} {...props}>
      {children}
    </a>
  ) : (
    <Link
      to={flattenToAppURL(href)}
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
  href: PropTypes.string.isRequired,
  openLinkInNewTab: PropTypes.bool,
  download: PropTypes.bool,
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default UniversalLink;
