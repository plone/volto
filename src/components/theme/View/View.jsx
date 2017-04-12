/**
 * View container.
 * @module components/theme/View/View
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { SummaryView, TabularView, DocumentView } from '../../../components';
import { getContent } from '../../../actions';

@connect(
  (state, props) => ({
    content: state.content.data,
    pathname: props.location.pathname,
  }), ({
    getContent,
  }),
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
    getContent: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    content: PropTypes.shape({
      '@type': PropTypes.string,
    }),
  }

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    content: null,
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getContent(this.props.pathname);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.getContent(nextProps.pathname);
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
      default:
        return <DocumentView content={this.props.content} />;
    }
  }
}
