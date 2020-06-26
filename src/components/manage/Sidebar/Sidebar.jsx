/**
 * Sidebar component.
 * @module components/manage/Sidebar/Sidebar
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import cookie from 'react-cookie';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';
import { BodyClass } from '@plone/volto/helpers';
import { Icon } from '@plone/volto/components';
import forbiddenSVG from '@plone/volto/icons/forbidden.svg';
import { setSidebarTab } from '@plone/volto/actions';
import expandSVG from '@plone/volto/icons/left-key.svg';
import collapseSVG from '@plone/volto/icons/right-key.svg';

const messages = defineMessages({
  document: {
    id: 'Document',
    defaultMessage: 'Document',
  },
  block: {
    id: 'Block',
    defaultMessage: 'Block',
  },
  settings: {
    id: 'Settings',
    defaultMessage: 'Settings',
  },
  shrinkSidebar: {
    id: 'Shrink sidebar',
    defaultMessage: 'Shrink sidebar',
  },
  expandSidebar: {
    id: 'Expand sidebar',
    defaultMessage: 'Expand sidebar',
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
  static propTypes = {
    documentTab: PropTypes.bool,
    blockTab: PropTypes.bool,
    settingsTab: PropTypes.bool,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    documentTab: true,
    blockTab: true,
    settingsTab: false,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Sidebar
   */
  constructor(props) {
    super(props);
    this.onToggleExpanded = this.onToggleExpanded.bind(this);
    this.onToggleFullSize = this.onToggleFullSize.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.state = {
      expanded: cookie.load('sidebar_expanded') !== 'false',
      size: 0,
      showFull: true,
      showFullToolbarExpanded: true,
    };
  }

  /**
   * On toggle expanded handler
   * also reset sidebar since this has mimized it
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
    this.resetFullSizeSidebar();
  }

  /**
   * Remove fullsize classes
   * Reset state
   */
  resetFullSizeSidebar() {
    if (!this.state.expanded) {
      const currentResizer = document.querySelector('#sidebar');
      const sidebarContainer = currentResizer.getElementsByClassName(
        'sidebar-container',
      )[0];
      sidebarContainer.classList.remove('full-size');
      sidebarContainer.classList.remove('no-toolbar');

      this.setState({
        showFull: true,
      });
    }
  }

  /**
   * Set width of sibar to 100% minus the width of the toolbar or reset to
   * initial size, by adding css classes
   */
  onToggleFullSize() {
    const currentResizer = document.querySelector('#sidebar');
    const sidebarContainer = currentResizer.getElementsByClassName(
      'sidebar-container',
    )[0];

    if (this.state.showFull) {
      sidebarContainer.classList.add('full-size');
      if (!this.props.toolbarExpanded) {
        sidebarContainer.classList.add('no-toolbar');
      } else {
        sidebarContainer.classList.remove('no-toolbar');
      }
    } else {
      sidebarContainer.classList.remove('full-size');
      sidebarContainer.classList.remove('no-toolbar');
    }

    this.setState((prevState) => ({
      showFull: !prevState.showFull,
    }));
  }

  /**
   * On tab change
   * @method onTabChange
   * @param {Object} event Event object
   * @param {Object} data Data object
   * @returns {undefined}
   */
  onTabChange(event, data) {
    this.props.setSidebarTab(data.activeIndex);
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
        <div
          className={cx('sidebar-container', { collapsed: !expanded })}
          style={this.state.size > 0 ? { width: this.state.size } : null}
        >
          <Button
            aria-label={
              expanded
                ? this.props.intl.formatMessage(messages.shrinkSidebar)
                : this.props.intl.formatMessage(messages.expandSidebar)
            }
            className={
              this.props.content && this.props.content.review_state
                ? `${this.props.content.review_state} trigger`
                : 'trigger'
            }
            onClick={this.onToggleExpanded}
          />
          <Button
            className="full-size-sidenav-btn"
            onClick={this.onToggleFullSize}
            aria-label="full-screen-sidenav"
          >
            <Icon
              className="full-size-icon"
              name={this.state.showFull ? expandSVG : collapseSVG}
            />
          </Button>
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
            activeIndex={this.props.tab}
            onTabChange={this.onTabChange}
            panes={[
              !!this.props.documentTab && {
                menuItem: this.props.intl.formatMessage(messages.document),
                pane: (
                  <Tab.Pane
                    key="metadata"
                    className="tab-wrapper"
                    id="sidebar-metadata"
                  />
                ),
              },
              !!this.props.blockTab && {
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
              !!this.props.settingsTab && {
                menuItem: this.props.intl.formatMessage(messages.settings),
                pane: (
                  <Tab.Pane
                    key="settings"
                    className="tab-wrapper"
                    id="sidebar-settings"
                  >
                    <Icon
                      className="tab-forbidden"
                      name={forbiddenSVG}
                      size="48px"
                    />
                  </Tab.Pane>
                ),
              },
            ].filter((tab) => tab)}
          />
        </div>
        <div className={this.state.expanded ? 'pusher expanded' : 'pusher'} />
      </Fragment>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state) => ({
      tab: state.sidebar.tab,
      toolbarExpanded: state.toolbar.expanded,
    }),
    { setSidebarTab },
  ),
)(Sidebar);
