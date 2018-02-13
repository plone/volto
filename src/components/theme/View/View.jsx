/**
 * View container.
 * @module components/theme/View/View
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  SummaryView,
  TabularView,
  DocumentView,
  ListingView,
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
   */
  componentWillMount() {
    this.props.getContent(this.props.pathname, this.props.versionId);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
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

    switch (this.props.content.layout) {
      case 'summary_view':
        return <SummaryView content={this.props.content} />;
      case 'tabular_view':
        return <TabularView content={this.props.content} />;
      case 'listing_view':
        return <ListingView content={this.props.content} />;
      default:
        return <DocumentView content={this.props.content} />;
    }
  }
}
