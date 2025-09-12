import React, { forwardRef } from 'react';
import { Link as RouterLink } from '@plone/components';
import cx from 'clsx';
import { isInternalURL, URLUtils } from '@plone/helpers';

export type UniversalLinkProps = {
  href?: string;
  item?: {
    '@id'?: string;
    '@type'?: string;
    remoteUrl?: string;
    getRemoteUrl?: string;
  };
  openInNewTab?: boolean;
  download?: boolean;
  children: React.ReactNode;
  className?: string;
  title?: string;
  smooth?: boolean;
  token?: string; // prepared for future use, not used now
};

const getUrl = (href?: string, item?: UniversalLinkProps['item']): string => {
  if (href) return href;
  if (item) {
    if (item.remoteUrl) return item.remoteUrl;
    if (item.getRemoteUrl) return item.getRemoteUrl;
    if (item['@id']) return item['@id'];
  }
  return '#';
};

export const UniversalLink = forwardRef<HTMLAnchorElement, UniversalLinkProps>(
  (
    {
      href,
      item,
      children,
      className,
      title,
      smooth,
      openInNewTab,
      download,
      token,
    },
    ref,
  ) => {
    const url = getUrl(href, item);

    const checkedURL = URLUtils.checkAndNormalizeUrl(url);
    const isExternal = !isInternalURL(url);
    const isDownload = download || url.includes('@@download/file');
    const isDisplayFile = url.includes('@@display-file/file');

    if (isInternalURL(url)) {
      if (isDownload) {
        return (
          <a href={url} ref={ref} className={className} title={title} download>
            {children}
          </a>
        );
      }
      if (isDisplayFile) {
        return (
          <a
            href={url}
            ref={ref}
            className={className}
            title={title}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      }
      return (
        <RouterLink to={url} ref={ref} className={className} title={title}>
          {children}
        </RouterLink>
      );
    }

    // external
    return (
      <a
        href={url}
        ref={ref}
        className={cx('external', className)}
        title={title}
        target={openInNewTab ? '_blank' : undefined}
        rel="noopener noreferrer"
        download={isDownload ? true : undefined}
      >
        {children}
      </a>
    );
  },
);

UniversalLink.displayName = 'UniversalLink';
