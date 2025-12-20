import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import config from '@plone/volto/registry';
import { isInternalURL, flattenToAppURL } from '@plone/volto/helpers/Url/Url';

const ViewLink = ({ url, target, download, children }) => {
  const { openExternalLinkInNewTab } = config.settings;
  const token = useSelector((state) => state.userSession?.token);
  let href = url;

  if (
    !token &&
    config.settings.viewableInBrowserObjects?.includes('File') &&
    url.includes('/@@download/file')
  ) {
    href = url.replace('/@@download/file', '/@@display-file/file');
  }

  return (
    <UniversalLink
      href={href}
      openLinkInNewTab={
        (openExternalLinkInNewTab && !isInternalURL(href)) || target === '_blank'
      }
      download={download}
    >
      {children}
    </UniversalLink>
  );
};

export const LinkElement = (props) => {
  const { attributes, children, element, mode = 'edit' } = props;
  const isInternalUrl = isInternalURL(element.data?.url);
  const linkUrl = element.data?.url;

  return mode === 'view' ? (
    <ViewLink {...(element.data || {})}>{children}</ViewLink>
  ) : (
    <a
      {...attributes}
      className={cx('slate-editor-link', { external: !isInternalUrl })}
      href={isInternalUrl ? flattenToAppURL(linkUrl) : linkUrl}
      onClick={(e) => e.preventDefault()}
    >
      {Array.isArray(children)
        ? children.map((child, i) => {
          if (child?.props?.decorations) {
            const isSelection =
              child.props.decorations.findIndex((deco) => deco.isSelection) >
              -1;
            if (isSelection)
              return (
                <span className="highlight-selection" key={`${i}-sel`}>
                  {child}
                </span>
              );
          }
          return child;
        })
        : children}
    </a>
  );
};
