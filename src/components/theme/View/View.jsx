/**
 * View container.
 * @module components/theme/View/View
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

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
} from '../../../components';
import { getContent } from '../../../actions';

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
    }),
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
      </div>
    );
  }
}
