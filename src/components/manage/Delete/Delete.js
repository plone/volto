/**
 * Delete container.
 * @module components/manage/Delete/Delete
 */

import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { Form, Editor, Layout } from '../../../components';
import { deleteContent, getContent, getSchema } from '../../../actions';
import config from '../../../config';

@connect(
  state => ({
    content: state.content.content,
    location: state.routing.location,
    getRequest: state.content.get,
    deleteRequest: state.content.delete,
  }),
  dispatch => bindActionCreators({ deleteContent, getContent }, dispatch),
)
/**
 * Delete container class.
 * @class Delete
 * @extends Component
 */
export default class Delete extends Component {

  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    deleteContent: PropTypes.func.isRequired,
    getContent: PropTypes.func.isRequired,
    deleteRequest: PropTypes.object,
    getRequest: PropTypes.object,
    location: PropTypes.object,
    content: PropTypes.object,
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getContent(this.props.location.pathname.split('/delete')[0]);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.deleteRequest.loading && nextProps.deleteRequest.loaded) {
      browserHistory.push(this.props.location.pathname.replace('/delete', '').replace(/\/[^/]*$/, ''));
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @returns {undefined}
   */
  onSubmit() {
    this.props.deleteContent(this.props.location.pathname.replace('/delete', ''));
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel(data) {
    browserHistory.push(this.props.location.pathname.replace('/delete', ''));
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (this.props.content) {
      return (
        <div id="page-delete">
          <Helmet title="Delete" />
          <div className="container">
            {this.props.error &&
              <div className="portalMessage error">
                <strong>Error</strong>
                 {this.props.error.message}
              </div>
            }
          </div>
          <h1 className="documentFirstHeading">Do you really want to delete this item?</h1>
          <ul>
            <li>{this.props.content.title}</li>
          </ul>
          <div className="formControls">
            <button className="context" onClick={::this.onSubmit}>Ok</button>
            &nbsp;
            <button onClick={::this.onCancel}>Cancel</button>
          </div>
        </div>
      );
    }
    return <div />;
  }
}
