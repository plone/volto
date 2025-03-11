import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useSelector } from 'react-redux';
import {
  flattenToAppURL,
  isInternalURL,
  URLUtils,
} from '@plone/volto/helpers/Url/Url';
import config from '@plone/volto/registry';
import cx from 'classnames';

interface UniversalLinkProps {
  href: string;
  item?: {
    '@id': string;
    remoteUrl?: string;
    getRemoteUrl?: string;
    '@type'?: string;
  };
  openLinkInNewTab?: boolean;
  download?: boolean;
  children: React.ReactNode;
  className?: string;
  title?: string;
  smooth?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export interface AppState {
  content: {
    data?: {
      '@components'?: {
        translations?: {
          items?: { language: string; '@id': string }[];
        };
      };
    };
  };
  navroot: {
    data: {
      navroot: {
        id: string;
      };
    };
  };
  intl: {
    locale: string;
  };
  userSession: {
    token: string;
  };
}

const UniversalLink = React.memo<UniversalLinkProps>(
  ({
    href,
    item,
    openLinkInNewTab,
    download,
    children,
    className,
    title,
    smooth,
    ...props
  }) => {
    const token = useSelector<AppState, string>(
      (state) => state.userSession?.token,
    );

    let url = href;
    if (!href && item) {
      if (item['@id'] === '') {
        url = config.settings.publicURL;
      } else if (!item['@id']) {
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
        let remoteUrl = item.remoteUrl || item.getRemoteUrl;
        if (!token && remoteUrl) {
          url = remoteUrl;
        }

        //case: item of type 'File'
        if (
          !token &&
          item?.['@type'] &&
          config.settings.downloadableObjects.includes(item['@type'])
        ) {
          url = `${url}/@@download/file`;
        }

        if (
          !token &&
          item?.['@type'] &&
          config.settings.viewableInBrowserObjects.includes(item['@type'])
        ) {
          url = `${url}/@@display-file/file`;
        }
      }
    }

    const isExternal = !isInternalURL(url);

    const isDownload = (!isExternal && url.includes('@@download')) || download;
    const isDisplayFile =
      (!isExternal && url.includes('@@display-file')) || false;

    const checkedURL = URLUtils.checkAndNormalizeUrl(url);

    url = checkedURL.url;
    let tag = (
      <Link
        to={flattenToAppURL(url)}
        target={openLinkInNewTab ?? false ? '_blank' : undefined}
        title={title}
        className={className}
        smooth={config.settings.hashLinkSmoothScroll}
        {...props}
      >
        {children}
      </Link>
    );

    if (isExternal) {
      const isTelephoneOrMail = checkedURL.isMail || checkedURL.isTelephone;
      tag = (
        <a
          href={url}
          title={title}
          target={
            !isTelephoneOrMail && !(openLinkInNewTab === false)
              ? '_blank'
              : undefined
          }
          rel="noopener noreferrer"
          className={cx({ external: !isTelephoneOrMail }, className)}
          {...props}
        >
          {children}
        </a>
      );
    } else if (isDownload) {
      tag = (
        <a
          href={flattenToAppURL(url)}
          download
          title={title}
          className={className}
          {...props}
        >
          {children}
        </a>
      );
    } else if (isDisplayFile) {
      tag = (
        <a
          href={flattenToAppURL(url)}
          title={title}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          {...props}
        >
          {children}
        </a>
      );
    }
    return tag;
  },
);

export default UniversalLink;
