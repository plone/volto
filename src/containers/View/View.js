/**
 * View container.
 * @module components/
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getContent } from 'actions';
import { SummaryView, DocumentView } from 'containers';

@connect(
  state => ({
    loaded: state.content.get.loaded,
    error: state.content.error,
    content: state.content.content,
    location: state.routing.location,
  }),
  dispatch => bindActionCreators({ getContent }, dispatch),
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
    location: PropTypes.object,
    loaded: PropTypes.bool.isRequired,
    error: PropTypes.object,
    content: PropTypes.object,
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getContent(this.props.location.pathname);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.getContent(nextProps.location.pathname);
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

    switch (this.props.content['@type']) {
    case 'Folder':
      return <SummaryView content={this.props.content} />;
    case 'Document':
      return <DocumentView content={this.props.content} />;
    }
    return <span />;
  }
}
