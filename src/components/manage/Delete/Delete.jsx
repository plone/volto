/**
 * Delete container.
 * @module components/manage/Delete/Delete
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Button, List } from 'semantic-ui-react';
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';

import { deleteContent, getContent } from '../../../actions';

const messages = defineMessages({
  delete: {
    id: 'Delete',
    defaultMessage: 'Delete',
  },
});

/**
 * Delete container class.
 * @class Delete
 * @extends Component
 */
@injectIntl
@connect(
  (state, props) => ({
    content: state.content.data,
    deleteRequest: state.content.delete,
    pathname: props.location.pathname,
  }),
  dispatch => bindActionCreators({ deleteContent, getContent }, dispatch),
)
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
    intl: intlShape.isRequired,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    content: null,
  };

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
   * 
   */
  componentWillMount() {
    this.props.getContent(this.props.pathname.split('/delete')[0]);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * 
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.deleteRequest.loading && nextProps.deleteRequest.loaded) {
      browserHistory.push(
        this.props.pathname.replace('/delete', '').replace(/\/[^/]*$/, ''),
      );
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * 
   */
  onSubmit() {
    this.props.deleteContent(this.props.pathname.replace('/delete', ''));
  }

  /**
   * Cancel handler
   * @method onCancel
   * 
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
          <Helmet title={this.props.intl.formatMessage(messages.delete)} />
          <h1 className="documentFirstHeading">
            <FormattedMessage
              id="Do you really want to delete this item?"
              defaultMessage="Do you really want to delete this item?"
            />
          </h1>
          <List bulleted>
            <List.Item>{this.props.content.title}</List.Item>
          </List>
          <Button primary onClick={this.onSubmit}>
            <FormattedMessage id="Ok" defaultMessage="Ok" />
          </Button>
          <Button onClick={this.onCancel}>
            <FormattedMessage id="Cancel" defaultMessage="Cancel" />
          </Button>
        </div>
      );
    }
    return <div />;
  }
}
