/**
 * View container.
 * @module components/
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getPage } from 'actions';
import { SummaryView, DocumentView } from 'containers';

@connect(
  state => ({
    loaded: state.page.loaded,
    error: state.page.error,
    page: state.page.page,
    location: state.routing.location,
  }),
  dispatch => bindActionCreators({ getPage }, dispatch),
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
    getPage: PropTypes.func.isRequired,
    location: PropTypes.object,
    loaded: PropTypes.bool.isRequired,
    error: PropTypes.object,
    page: PropTypes.object,
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getPage(this.props.location.pathname);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.getPage(nextProps.location.pathname);
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (!this.props.page) {
      return <span />;
    }

    switch (this.props.page['@type']) {
    case 'Folder':
      return <SummaryView page={this.props.page} />;
    case 'Document':
      return <DocumentView page={this.props.page} />;
    }
  }
}
