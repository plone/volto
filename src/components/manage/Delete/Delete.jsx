/**
 * Delete container.
 * @module components/manage/Delete/Delete
 */

import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { deleteContent, getContent } from '../../../actions';

@connect(
  state => ({
    content: state.content.content,
    pathname: state.routing.locationBeforeTransitions.pathname,
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
    deleteRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    content: PropTypes.shape({
      title: PropTypes.string,
    }),
  }

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    content: null,
  }

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getContent(this.props.pathname.split('/delete')[0]);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.deleteRequest.loading && nextProps.deleteRequest.loaded) {
      browserHistory.push(this.props.pathname.replace('/delete', '').replace(/\/[^/]*$/, ''));
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @returns {undefined}
   */
  onSubmit() {
    this.props.deleteContent(this.props.pathname.replace('/delete', ''));
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    browserHistory.push(this.props.pathname.replace('/delete', ''));
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
          <h1 className="documentFirstHeading">Do you really want to delete this item?</h1>
          <ul>
            <li>{this.props.content.title}</li>
          </ul>
          <div className="formControls">
            <button className="context" onClick={this.onSubmit}>Ok</button>
            &nbsp;
            <button onClick={this.onCancel}>Cancel</button>
          </div>
        </div>
      );
    }
    return <div />;
  }
}
