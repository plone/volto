/**
 * Edit container.
 * @module components/
 */

import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getPage } from 'actions';
import { Layout } from 'components';

@connect(
  state => ({
    loaded: state.page.loaded,
    error: state.page.error,
    page: state.page.page,
  }),
  dispatch => bindActionCreators({ getPage }, dispatch),
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
    this.props.getPage(this.props.location.pathname.split('/edit')[0]);
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (this.props.page && this.props.page.layout) {
      return (
        <div id="page-home">
          <Helmet title="Home" />
          <Layout layout={this.props.page.layout} />
        </div>
      );
    }
    if (this.props.page && this.props.page.content) {
      return (
        <div id="page-home">
          <Helmet title="Home" />
          <div className="container">
            <div className="field" data-fieldname="form.widgets.IDublinCore.title" id="formfield-form-widgets-IDublinCore-title">
              <label forHtml="form-widgets-IDublinCore-title" className="horizontal">
                Title <span className="required horizontal" title="Required">&nbsp;</span>
              </label>
                
              <input id="form-widgets-IDublinCore-title" name="form.widgets.IDublinCore.title" className="text-widget required textline-field" value={this.props.page && this.props.page.content.title} type="text" />
            </div>

            <div className="field" data-fieldname="form.widgets.IDublinCore.description" id="formfield-form-widgets-IDublinCore-description">
              <label forHtml="form-widgets-IDublinCore-description" className="horizontal">
                Summary <span className="formHelp">Used in item listings and search results.</span>
              </label>
              <textarea id="form-widgets-IDublinCore-description" name="form.widgets.IDublinCore.description" className="textarea-widget text-field" value={this.props.page && this.props.page.content.description} />
            </div>

            <div className="field" data-fieldname="form.widgets.IDublinCore.body" id="formfield-form-widgets-IDublinCore-body">
              <label forHtml="form-widgets-IDublinCore-body" className="horizontal">
                Body
              </label>
              <textarea id="form-widgets-IDublinCore-body" name="form.widgets.IDublinCore.body" className="textarea-widget text-field" value={this.props.page && this.props.page.content.body} />
            </div>
          </div>
        </div>
      );
    }
    return <div />;
  }
}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Edit.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Edit;
