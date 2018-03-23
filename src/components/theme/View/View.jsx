/**
 * View container.
 * @module components/theme/View/View
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Portal } from 'react-portal';
import { Link } from 'react-router';
import { Dropdown, Icon } from 'semantic-ui-react';
import { injectIntl, intlShape } from 'react-intl';
import { find } from 'lodash';

import {
  Comments,
  DocumentView,
  FileView,
  ImageView,
  ListingView,
  NewsItemView,
  SocialSharing,
  SummaryView,
  TabularView,
  Tags,
  Toolbar,
  Actions,
  Display,
  Types,
  Workflow,
} from '../../../components';
import { getActions, getContent } from '../../../actions';
import { getBaseUrl } from '../../../helpers';

@injectIntl
@connect(
  (state, props) => ({
    actions: state.actions.actions,
    content: state.content.data,
    pathname: props.location.pathname,
    versionId: props.location.query && props.location.query.version_id,
  }),
  {
    getActions,
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
    getActions: PropTypes.func.isRequired,
    /**
     * Action to get the content
     */
    getContent: PropTypes.func.isRequired,
    /**
     * Pathname of the object
     */
    pathname: PropTypes.string.isRequired,
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
    this.props.getActions(this.props.pathname);
    this.props.getContent(this.props.pathname, this.props.versionId);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.getActions(nextProps.pathname);
      this.props.getContent(nextProps.pathname, this.props.versionId);
    }

    if (nextProps.actions.object_buttons) {
      const objectButtons = nextProps.actions.object_buttons;
      this.setState({
        hasObjectButtons: !!objectButtons.length,
      });
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (!this.props.content) {
      return <span />;
    }

    let view;

    switch (this.props.content.layout) {
      case 'summary_view':
        view = <SummaryView content={this.props.content} />;
        break;
      case 'tabular_view':
        view = <TabularView content={this.props.content} />;
        break;
      case 'listing_view':
        view = <ListingView content={this.props.content} />;
        break;
      case 'news_item_view':
        view = <NewsItemView content={this.props.content} />;
        break;
      case 'file_view':
        view = <FileView content={this.props.content} />;
        break;
      case 'image_view':
        view = <ImageView content={this.props.content} />;
        break;
      default:
        view = <DocumentView content={this.props.content} />;
        break;
    }

    const viewName = view.type
      ? view.type.WrappedComponent
        ? view.type.WrappedComponent.name
        : view.type.name
      : view.constructor.name;
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
        <Helmet
          bodyAttributes={{
            class: `view-${viewName.toLowerCase()}`,
          }}
        />
        {view}
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
                {this.props.content &&
                  this.props.content.is_folderish && <Types pathname={path} />}

                <Dropdown
                  id="toolbar-more"
                  item
                  trigger={<Icon name="ellipsis horizontal" size="big" />}
                >
                  <Dropdown.Menu>
                    <Workflow pathname={path} />
                    {this.state.hasObjectButtons && <Actions pathname={path} />}
                    <Display pathname={path} />
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
