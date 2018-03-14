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
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';

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
import { getContent } from '../../../actions';
import { getBaseUrl } from '../../../helpers';

const messages = defineMessages({
  contents: {
    id: 'Contents',
    defaultMessage: 'Contents',
  },
  edit: {
    id: 'Edit',
    defaultMessage: 'Edit',
  },
});

@injectIntl
@connect(
  (state, props) => ({
    content: state.content.data,
    pathname: props.location.pathname,
    versionId: props.location.query && props.location.query.version_id,
  }),
  {
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
    content: null,
    versionId: null,
  };

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
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
      this.props.getContent(nextProps.pathname, this.props.versionId);
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
                <Link to={`${path}/edit`} id="toolbar-edit" className="item">
                  <Icon
                    name="write"
                    size="big"
                    color="blue"
                    title={this.props.intl.formatMessage(messages.edit)}
                  />
                </Link>
                {this.props.content &&
                  this.props.content.is_folderish && (
                    <Link
                      to={`${path}/contents`.replace(/\/\//g, '/')}
                      id="toolbar-folder-contents"
                      className="item"
                    >
                      <Icon
                        name="folder open"
                        size="big"
                        title={this.props.intl.formatMessage(messages.contents)}
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
                    <Actions pathname={path} />
                    <Display pathname={path} />
                    <Link
                      to={`${path}/history`}
                      id="toolbar-history"
                      className="item"
                    >
                      <Icon name="clock" size="big" />{' '}
                      <FormattedMessage id="History" defaultMessage="History" />
                    </Link>
                    <Link
                      to={`${path}/sharing`}
                      id="toolbar-sharing"
                      className="item"
                    >
                      <Icon name="share" size="big" />{' '}
                      <FormattedMessage id="Sharing" defaultMessage="Sharing" />
                    </Link>
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
                    <Link to="/personal-preferences" className="item">
                      <span>
                        <Icon name="setting" />{' '}
                        <FormattedMessage
                          id="Preferences"
                          defaultMessage="Preferences"
                        />
                      </span>
                    </Link>
                    <Link to="/controlpanel" className="item">
                      <span>
                        <Icon name="settings" />{' '}
                        <FormattedMessage
                          id="Site Setup"
                          defaultMessage="Site Setup"
                        />
                      </span>
                    </Link>
                    <Link to="/controlpanel/moderate-comments" className="item">
                      <span>
                        <Icon name="comments" />{' '}
                        <FormattedMessage
                          id="Moderate comments"
                          defaultMessage="Moderate comments"
                        />
                      </span>
                    </Link>
                    <Link to="/logout" id="toolbar-logout" className="item">
                      <span>
                        <Icon name="sign out" />{' '}
                        <FormattedMessage
                          id="Log out"
                          defaultMessage="Log out"
                        />
                      </span>
                    </Link>
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
