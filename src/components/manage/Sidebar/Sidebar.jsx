/**
 * Sidebar component.
 * @module components/manage/Sidebar/Sidebar
 */

import React, { Component, Fragment } from 'react';
import { Button, Tab } from 'semantic-ui-react';
import cookie from 'react-cookie';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';
import { BodyClass } from '../../../helpers';
import { Icon } from '../../../components';
import forbiddenSVG from '../../../icons/forbidden.svg';

const messages = defineMessages({
  document: {
    id: 'Document',
    defaultMessage: 'Document',
  },
  block: {
    id: 'Block',
    defaultMessage: 'Block',
  },
});

/**
 * Sidebar container class.
 * @class Sidebar
 * @extends Component
 */
class Sidebar extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {};

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Sidebar
   */
  constructor(props) {
    super(props);
    this.onToggleExpanded = this.onToggleExpanded.bind(this);
    this.state = {
      expanded: cookie.load('sidebar_expanded') !== 'false',
    };
  }

  /**
   * On toggle expanded handler
   * @method onToggleExpanded
   * @returns {undefined}
   */
  onToggleExpanded() {
    cookie.save('sidebar_expanded', !this.state.expanded, {
      expires: new Date((2 ** 31 - 1) * 1000),
      path: '/',
    });
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { expanded } = this.state;

    return (
      <Fragment>
        <BodyClass
          className={expanded ? 'has-sidebar' : 'has-sidebar-collapsed'}
        />
        <div className={cx('sidebar-container', { collapsed: !expanded })}>
          <Button
            aria-label={expanded ? 'Shrink sidebar' : 'Expand sidebar'}
            className={
              this.props.content && this.props.content.review_state
                ? `${this.props.content.review_state} trigger`
                : 'trigger'
            }
            onClick={this.onToggleExpanded}
          />
          <Tab
            menu={{
              secondary: true,
              pointing: true,
              attached: true,
              tabular: true,
              className: 'formtabs',
            }}
            className="tabs-wrapper"
            renderActiveOnly={false}
            defaultActiveIndex={1}
            panes={[
              {
                menuItem: this.props.intl.formatMessage(messages.document),
                pane: (
                  <Tab.Pane
                    key="metadata"
                    className="tab-wrapper"
                    id="sidebar-metadata"
                  />
                ),
              },
              {
                menuItem: this.props.intl.formatMessage(messages.block),
                pane: (
                  <Tab.Pane
                    key="properties"
                    className="tab-wrapper"
                    id="sidebar-properties"
                  >
                    <Icon
                      className="tab-forbidden"
                      name={forbiddenSVG}
                      size="48px"
                    />
                  </Tab.Pane>
                ),
              },
            ]}
          />
        </div>
        <div className={this.state.expanded ? 'pusher expanded' : 'pusher'} />
      </Fragment>
    );
  }
}

export default injectIntl(Sidebar);
