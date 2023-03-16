import React from 'react';
import { UniversalLink } from '@plone/volto/components';
import config from '@plone/volto/registry';
import { isInternalURL, flattenToAppURL } from '@plone/volto/helpers';

const ViewLink = ({ url, target, download, children }) => {
  const { openExternalLinkInNewTab } = config.settings;
  return (
    <UniversalLink
      href={url}
      openLinkInNewTab={
        (openExternalLinkInNewTab && !isInternalURL(url)) || target === '_blank'
      }
      download={download}
    >
      {children}
    </UniversalLink>
  );
};

export const LinkElement = (props) => {
  const { attributes, children, element, mode = 'edit' } = props;

  return mode === 'view' ? (
    <ViewLink {...(element.data || {})}>{children}</ViewLink>
  ) : (
    <a
      {...attributes}
      className="slate-editor-link"
      href={
        isInternalURL(element.data?.url)
          ? flattenToAppURL(element.data?.url)
          : element.data?.url
      }
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
