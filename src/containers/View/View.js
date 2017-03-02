/**
 * View container.
 * @module components/
 */

import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getPage } from 'actions';

@connect(
  state => ({
    loaded: state.page.loaded,
    error: state.page.error,
    page: state.page.page,
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
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div id="page-home">
        <Helmet title="Home" />
        <div className="container">
          <h1>{this.props.page && this.props.page.content.title}</h1>
          <p className="description">{this.props.page && this.props.page.content.description }</p>
          <p className="body" dangerouslySetInnerHTML={this.props.page && {__html: this.props.page.content.body}} />
        </div>
      </div>
    );
  }
}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  location: PropTypes.object.isRequired,
};
