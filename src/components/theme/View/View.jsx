/**
 * View container.
 * @module components/theme/View/View
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Portal } from 'react-portal';
import { Link } from 'react-router-dom';
import { Dropdown, Icon } from 'semantic-ui-react';
import { injectIntl, intlShape } from 'react-intl';
import { find } from 'lodash';
import { defaultView, contentTypesViews, layoutViews } from '~/config';

import {
  Comments,
  SocialSharing,
  Tags,
  Toolbar,
  Actions,
  Display,
  NotFound,
  Types,
  Workflow,
} from '../../../components';
import { listActions, getContent } from '../../../actions';
import { BodyClass, getBaseUrl } from '../../../helpers';

@injectIntl
@connect(
  (state, props) => ({
    actions: state.actions.actions,
    content: state.content.data,
    error: state.content.get.error,
    pathname: props.location.pathname,
    versionId: props.location.query && props.location.query.version_id,
  }),
  {
    listActions,
    getContent,
  },
)
/**
 * View container class.
 * @class View
 * @extends Component
 */
export default class View extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    actions: PropTypes.shape({
      object: PropTypes.arrayOf(PropTypes.object),
      object_buttons: PropTypes.arrayOf(PropTypes.object),
      user: PropTypes.arrayOf(PropTypes.object),
    }),
    listActions: PropTypes.func.isRequired,
    /**
     * Action to get the content
     */
    getContent: PropTypes.func.isRequired,
    /**
     * Pathname of the object
     */
    pathname: PropTypes.string.isRequired,
    location: PropTypes.shape({
      query: PropTypes.object,
      pathname: PropTypes.string,
    }).isRequired,
    /**
     * Version id of the object
     */
    versionId: PropTypes.string,
    /**
     * Content of the object
     */
    content: PropTypes.shape({
      /**
       * Layout of the object
       */
      layout: PropTypes.string,
      /**
       * Allow discussion of the object
       */
      allow_discussion: PropTypes.bool,
      /**
       * Title of the object
       */
      title: PropTypes.string,
      /**
       * Description of the object
       */
      description: PropTypes.string,
      /**
       * Type of the object
       */
      '@type': PropTypes.string,
      /**
       * Subjects of the object
       */
      subjects: PropTypes.arrayOf(PropTypes.string),
      is_folderish: PropTypes.bool,
    }),
    error: PropTypes.shape({
      /**
       * Error type
       */
      type: PropTypes.string,
    }),
    intl: intlShape.isRequired,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    actions: null,
    content: null,
    versionId: null,
    error: null,
  };

  state = {
    hasObjectButtons: null,
  };

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.listActions(getBaseUrl(this.props.pathname));
    this.props.getContent(
      getBaseUrl(this.props.pathname),
      this.props.versionId,
    );
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.listActions(getBaseUrl(nextProps.pathname));
      this.props.getContent(
        getBaseUrl(nextProps.pathname),
        this.props.versionId,
      );
    }

    if (nextProps.actions.object_buttons) {
      const objectButtons = nextProps.actions.object_buttons;
      this.setState({
        hasObjectButtons: !!objectButtons.length,
      });
    }
  }

  /**
   * Default fallback view
   * @method getViewDefault
   * @returns {string} Markup for component.
   */
  getViewDefault = () => defaultView;

  /**
   * Get view by content type
   * @method getViewByType
   * @returns {string} Markup for component.
   */
  getViewByType = () => contentTypesViews[this.props.content['@type']] || null;

  /**
   * Get view by content layout property
   * @method getViewByLayout
   * @returns {string} Markup for component.
   */
  getViewByLayout = () => layoutViews[this.props.content.layout] || null;

  /**
   * Cleans the component displayName (specially for connected components)
   * which have the Connect(componentDisplayName)
   * @method cleanViewName
   * @param  {string} dirtyDisplayName The displayName
   * @returns {string} Clean displayName (no Connect(...)).
   */
  cleanViewName = dirtyDisplayName =>
    dirtyDisplayName
      .replace('Connect(', '')
      .replace(')', '')
      .toLowerCase();

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (this.props.error) {
      return (
        <div id="view">
          <NotFound />
        </div>
      );
    }
    if (!this.props.content) {
      return <span />;
    }
    const RenderedView =
      this.getViewByType() || this.getViewByLayout() || this.getViewDefault();

    const path = getBaseUrl(this.props.pathname);
    const editAction = find(this.props.actions.object, { id: 'edit' });
    const folderContentsAction = find(this.props.actions.object, {
      id: 'folderContents',
    });
    const historyAction = find(this.props.actions.object, { id: 'history' });
    const sharingAction = find(this.props.actions.object, {
      id: 'local_roles',
    });

    return (
      <div id="view">
        <BodyClass
          className={
            RenderedView.displayName
              ? `view-${this.cleanViewName(RenderedView.displayName)}`
              : null
          }
        />

        <RenderedView
          content={this.props.content}
          location={this.props.location}
        />

        {this.props.content.subjects &&
          this.props.content.subjects.length > 0 && (
            <Tags tags={this.props.content.subjects} />
          )}
        <SocialSharing
          url={typeof window === 'undefined' ? '' : window.location.href}
          title={this.props.content.title}
          description={this.props.content.description || ''}
        />
        {this.props.content.allow_discussion && (
          <Comments pathname={this.props.pathname} />
        )}

        <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
          <Toolbar
            pathname={this.props.pathname}
            inner={
              <div>
                {editAction && (
                  <Link to={`${path}/edit`} id="toolbar-edit" className="item">
                    <Icon
                      name="write"
                      size="big"
                      color="blue"
                      title={editAction.title}
                    />
                  </Link>
                )}
                {this.props.content &&
                  this.props.content.is_folderish &&
                  folderContentsAction && (
                    <Link
                      to={`${path}/contents`.replace(/\/\//g, '/')}
                      id="toolbar-folder-contents"
                      className="item"
                    >
                      <Icon
                        name="folder open"
                        size="big"
                        title={folderContentsAction.title}
                      />
                    </Link>
                  )}
                <Types pathname={path} />

                <Dropdown
                  id="toolbar-more"
                  item
                  trigger={<Icon name="ellipsis horizontal" size="big" />}
                >
                  <Dropdown.Menu>
                    <Workflow pathname={path} />
                    {this.state.hasObjectButtons && <Actions pathname={path} />}
                    {editAction && <Display pathname={path} />}
                    {historyAction && (
                      <Link
                        to={`${path}/history`}
                        id="toolbar-history"
                        className="item"
                      >
                        <Icon name="clock" size="big" /> {historyAction.title}
                      </Link>
                    )}
                    {sharingAction && (
                      <Link
                        to={`${path}/sharing`}
                        id="toolbar-sharing"
                        className="item"
                      >
                        <Icon name="share" size="big" /> {sharingAction.title}
                      </Link>
                    )}
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown
                  id="toolbar-personal"
                  className="personal-bar"
                  item
                  upward
                  trigger={<Icon name="user" size="big" />}
                >
                  <Dropdown.Menu>
                    {this.props.actions.user &&
                      this.props.actions.user.map(item => {
                        switch (item.id) {
                          case 'preferences':
                            return (
                              <Link
                                key={item.id}
                                to="/personal-preferences"
                                className="item"
                              >
                                <span>
                                  <Icon name="setting" /> {item.title}
                                </span>
                              </Link>
                            );

                          case 'plone_setup':
                            return (
                              <Link
                                key={item.id}
                                to="/controlpanel"
                                className="item"
                              >
                                <span>
                                  <Icon name="settings" /> {item.title}
                                </span>
                              </Link>
                            );

                          case 'logout':
                            return (
                              <Link
                                key={item.id}
                                to="/logout"
                                id="toolbar-logout"
                                className="item"
                              >
                                <span>
                                  <Icon name="sign out" /> {item.title}
                                </span>
                              </Link>
                            );
                          default: {
                            return null;
                          }
                        }
                      })}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            }
          />
        </Portal>
      </div>
    );
  }
}
