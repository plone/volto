/**
 * Edit container.
 * @module components/manage/Edit/Edit
 */

import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { Form, Editor, Layout } from '../../../components';
import { editContent, getContent, getSchema } from '../../../actions';
import config from '../../../config';

@connect(
  state => ({
    content: state.content.content,
    schema: state.schema.schema,
    location: state.routing.location,
    getRequest: state.content.get,
    editRequest: state.content.edit,
  }),
  dispatch => bindActionCreators({ editContent, getContent, getSchema }, dispatch),
)
/**
 * Edit container class.
 * @class Edit
 * @extends Component
 */
export default class Edit extends Component {

  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    editContent: PropTypes.func.isRequired,
    getContent: PropTypes.func.isRequired,
    getSchema: PropTypes.func.isRequired,
    editRequest: PropTypes.object,
    getRequest: PropTypes.object,
    location: PropTypes.object,
    content: PropTypes.object,
    schema: PropTypes.object,
  }

  state = {};

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getContent(this.props.location.pathname.split('/edit')[0]);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.getRequest.loading && nextProps.getRequest.loaded) {
      this.props.getSchema(nextProps.content['@type']);
    }
    if (this.props.editRequest.loading && nextProps.editRequest.loaded) {
      browserHistory.push(this.props.location.pathname.replace('/edit', ''));
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {bool} Should continue.
   */
  onSubmit(data) {
    this.props.editContent(this.props.location.pathname.replace('/edit', ''),
                           data.formData);
    return false;
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel(data) {
    browserHistory.push(this.props.location.pathname.replace('/edit', ''));
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (this.props.schema && this.props.content) {
      return (
        <div id="page-edit">
          <Helmet title="Edit" />
          <div className="container">
            <Form schema={this.props.schema}
                  formData={{
                    ...this.props.content,
                    text: this.props.content.text ? this.props.content.text.data : '',
                  }}
                  onSubmit={::this.onSubmit}
                  onCancel={::this.onCancel} />
          </div>
        </div>
      );
    }
    /*
    if (this.props.content && this.props.content.layout) {
      return (
        <div id="page-home">
          <Helmet title="Home" />
          <Layout layout={this.props.content.layout} />
        </div>
      );
    }
    */
    return <div />;
  }
}
