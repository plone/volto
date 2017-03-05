/**
 * Add container.
 * @module components/manage/Add/Add
 */

import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { addContent, getSchema } from '../../../actions';
import { Layout, Form } from '../../../components';
import config from '../../../config';

@connect(
  state => ({
    request: state.content.add,
    content: state.content.content,
    schema: state.schema.schema,
    location: state.routing.location,
  }),
  dispatch => bindActionCreators({ addContent, getSchema }, dispatch),
)
/**
 * Add container class.
 * @class Add
 * @extends Component
 */
export default class Add extends Component {

  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    addContent: PropTypes.func.isRequired,
    getSchema: PropTypes.func.isRequired,
    location: PropTypes.object,
    schema: PropTypes.object,
    content: PropTypes.object,
    request: PropTypes.object,
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getSchema('Document');
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.request.loading && nextProps.request.loaded) {
      browserHistory.push(nextProps.content['@id'].replace(config.apiPath, ''));
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {bool} Should continue.
   */
  onSubmit(data) {
    this.props.addContent(this.props.location.pathname.replace('/add', ''),
                          { ...data, '@type': 'Document' });
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
    if (this.props.schema) {
      return (
        <div id="page-add">
          <Helmet title="Add: Document" />
          <div className="container">
            <Form schema={this.props.schema}
                  onSubmit={::this.onSubmit}
                  onCancel={::this.onCancel} />
          </div>
        </div>
      );
    }
    return <div />;
  }
}
