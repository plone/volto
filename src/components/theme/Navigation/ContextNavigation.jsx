import PropTypes from 'prop-types';
import React from 'react';
import { List, Image } from 'semantic-ui-react';
import { Link as RouterLink } from 'react-router-dom';
import cx from 'classnames';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { defineMessages, useIntl } from 'react-intl';

import { flattenToAppURL } from '@plone/volto/helpers';
import { Icon } from '@plone/volto/components';
import { withContentNavigation } from './withContentNavigation';

import leftIcon from '@plone/volto/icons/left-key.svg';

const messages = defineMessages({
  navigation: {
    id: 'Navigation',
    defaultMessage: 'Navigation',
  },
});

function renderNode(node, level) {
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
 */
export function ContextNavigationComponent(props) {
  const { navigation = {} } = props;
  const { items = [] } = navigation;
  const intl = useIntl();

  return items.length ? (
    <div className="context-navigation">
      {navigation.has_custom_name ? (
        <div className="context-navigation-header">
          <RouterLink to={flattenToAppURL(navigation.url || '')}>
            {navigation.title}
          </RouterLink>
        </div>
      ) : (
        <div className="context-navigation-header">
          {intl.formatMessage(messages.navigation)}
        </div>
      )}
      <List>{items.map(renderNode)}</List>
    </div>
  ) : (
    ''
  );
}

ContextNavigationComponent.propTypes = {
  /**
   * Navigation tree returned from @contextnavigation restapi endpoint
   */
  navigation: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      }),
    ),
    has_custom_name: PropTypes.bool,
    title: PropTypes.string,
  }),
};

export default compose(
  withRouter,
  withContentNavigation,
)(ContextNavigationComponent);
