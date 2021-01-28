import React from 'react';
import { List, Image } from 'semantic-ui-react';
import { Link as RouterLink } from 'react-router-dom';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { getContextNavigation } from '@plone/volto/actions';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import { Icon } from '@plone/volto/components';

import leftIcon from '@plone/volto/icons/left-key.svg';

function renderNode(node) {
  return (
    <List.Item key={node['@id']} active={node.is_current}>
      <List.Content>
        <RouterLink
          to={flattenToAppURL(node.href)}
          title={node.description}
          className={cx(`contenttype-${node.type}`, {
            in_path: node.is_in_path,
          })}
        >
          {node.thumb ? <Image src={flattenToAppURL(node.thumb)} /> : ''}
          {node.title}
          {node.is_current ? (
            <List.Content className="active-indicator">
              <Icon name={leftIcon} size="30px" />
            </List.Content>
          ) : (
            ''
          )}
        </RouterLink>

        {(node.items?.length && (
          <List.List>{node.items.map(renderNode)}</List.List>
        )) ||
          ''}
      </List.Content>
    </List.Item>
  );
}

/**
 * A navigation slot implementation, similar to the classic Plone navigation
 * portlet. It uses the same API, so the options are similar to
 * INavigationPortlet
 *
 * @param {string} pathname Optional pathname to use for this component
 * @param {params} params Options for the @contextnavigation endpoint
 *
 * name - The title of the navigation tree.
 * root_path - Root node path, can be "frontend path", derived from router
 * includeTop - Bool, Include top nodeschema
 * currentFolderOnly - Bool, Only show the contents of the current folder.
 * topLevel - Int, Start level
 * bottomLevel - Int, Navigation tree depth
 * no_icons - Bool, Suppress Icons
 * thumb_scale - String, Override thumb scale
 * no_thumbs = Bool, Suppress thumbs
 *
 */
function ContextNavigation(props) {
  const {
    location,
    pathname = getBaseUrl(location.pathname),
    params = {},
  } = props;

  let qs = Object.keys(params)
    .sort()
    .map((key) => `expand.contextnavigation.${key}=${params[key]}`)
    .join('&');
  const path = `${pathname}${
    pathname.endsWith('/') ? '' : '/'
  }@contextnavigation${qs ? `?${qs}` : ''}`;

  const dispatch = useDispatch();
  const nav = useSelector((state) => state.contextNavigation?.[path]?.data);

  const { items = [] } = nav || {};

  useDeepCompareEffect(() => {
    dispatch(getContextNavigation(pathname, params));
  }, [pathname, dispatch, params]);

  return items.length ? (
    <div className="context-navigation">
      {nav.has_custom_name ? (
        <div className="context-navigation-header">
          <RouterLink to={flattenToAppURL(nav.contextnavigation?.url || '')}>
            {nav.contextnavigation.title}
          </RouterLink>
        </div>
      ) : (
        ''
      )}
      <List>{items.map(renderNode)}</List>
    </div>
  ) : (
    ''
  );
}

export default withRouter(ContextNavigation);
