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
import type { ObjectBrowserItem } from '@plone/types';

type BaseProps = {
  openLinkInNewTab?: boolean;
  download?: boolean;
  children: React.ReactNode;
  className?: string;
  title?: string;
  smooth?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
};

type HrefOnly = {
  href: string;
  item?: never;
} & BaseProps;

type ItemOnly = {
  href?: never;
  item: Partial<ObjectBrowserItem> & { remoteUrl?: string };
} & BaseProps;

export type UniversalLinkProps = HrefOnly | ItemOnly;
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
    token: string | null;
  };
}

export const __test = {
  renderCounter: () => {},
};

export function getUrl(
  props: UniversalLinkProps,
  token: string | null,
  item: UniversalLinkProps['item'],
  children: React.ReactNode,
): string {
  if ('href' in props && typeof props.href === 'string') {
    return props.href;
  }

  if (!item || item['@id'] === '') return config.settings.publicURL;
  if (!item['@id']) {
    // eslint-disable-next-line no-console
    console.error(
      'Invalid item passed to UniversalLink',
      item,
      props,
      children,
    );
    return '#';
  }

  let url = flattenToAppURL(item['@id']);
  const remoteUrl = item.remoteUrl || item.getRemoteUrl;

  if (!token && remoteUrl) {
    url = remoteUrl;
  }

  if (
    !token &&
    item['@type'] &&
    config.settings.downloadableObjects.includes(item['@type'])
  ) {
    url = `${url}/@@download/file`;
  }

  if (
    !token &&
    item['@type'] &&
    config.settings.viewableInBrowserObjects.includes(item['@type'])
  ) {
    url = `${url}/@@display-file/file`;
  }

  return url;
}

const UniversalLink = React.memo(
  React.forwardRef<HTMLAnchorElement | HTMLDivElement, UniversalLinkProps>(
    function UniversalLink(props, ref) {
      const {
        openLinkInNewTab,
        download,
        children,
        className,
        title,
        smooth,
        onClick,
        onKeyDown,
        item,
        href,
        ...rest
      } = props;
      __test.renderCounter();

      const token = useSelector<AppState, string | null>(
        (state) => state.userSession?.token,
      );

      let url = getUrl(props, token, item, children);

      const isExternal = !isInternalURL(url);

      const isDownload =
        (!isExternal && url.includes('@@download')) || download;
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
          onClick={onClick}
          smooth={smooth ?? config.settings.hashLinkSmoothScroll}
          // @ts-ignore
          ref={ref}
          {...rest}
        >
          {children}
        </Link>
      );

      if (isExternal) {
        const isTelephoneOrMail = checkedURL.isMail || checkedURL.isTelephone;
        const getClassName = cx({ external: !isTelephoneOrMail }, className);

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
            {...rest}
            className={getClassName}
            ref={ref as React.Ref<HTMLAnchorElement>}
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
            {...rest}
            className={className}
            ref={ref as React.Ref<HTMLAnchorElement>}
          >
            {children}
          </a>
        );
      } else if (isDisplayFile) {
        tag = (
          <a
            title={title}
            target="_blank"
            rel="noopener noreferrer"
            {...rest}
            href={flattenToAppURL(url)}
            className={className}
            ref={ref as React.Ref<HTMLAnchorElement>}
          >
            {children}
          </a>
        );
      }
      return tag;
    },
  ),
);

export default UniversalLink;
