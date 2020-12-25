import React from 'react';
import { List, Image } from 'semantic-ui-react';
import { Link as RouterLink } from 'react-router-dom';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { getNavPortlet } from '@plone/volto/actions';
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
 * A navigation portlet implementation, similar to the classic Plone navigation
 * portlet. It uses the same API, so the options are similar to
 * INavigationPortlet
 *
 * @param {string} pathname Optional pathname to use for this portlet
 * @param {params} params Options for the navigation portlet
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
function NavPortlet(props) {
  const {
    location,
    pathname = getBaseUrl(location.pathname),
    params = {},
  } = props;

  let qs = Object.keys(params)
    .sort()
    .map((key) => `expand.navportlet.${key}=${params[key]}`)
    .join('&');
  const path = `${pathname}${pathname.endsWith('/') ? '' : '/'}@navportlet${
    qs ? `?${qs}` : ''
  }`;

  const dispatch = useDispatch();
  const portlet = useSelector((state) => state.navPortlet?.[path]?.data);

  const { items = [] } = portlet || {};

  useDeepCompareEffect(() => {
    dispatch(getNavPortlet(pathname, params));
  }, [pathname, dispatch, params]);

  return items.length ? (
    <div className="navigation-portlet">
      {portlet.navigationportlet?.has_custom_name ? (
        <div className="nav-portlet-header">
          <RouterLink
            to={flattenToAppURL(portlet.navigationportlet?.url || '')}
          >
            {portlet.navigationportlet.title}
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

export default withRouter(NavPortlet);
