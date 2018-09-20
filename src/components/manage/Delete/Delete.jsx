/**
 * Delete container.
 * @module components/manage/Delete/Delete
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router } from 'react-router-dom';
import { Portal } from 'react-portal';
import { Button, Container, List, Segment } from 'semantic-ui-react';
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';

import { deleteContent, getContent } from '../../../actions';
import { Toolbar } from '../../../components';

const messages = defineMessages({
  delete: {
    id: 'Delete',
    defaultMessage: 'Delete',
  },
  ok: {
    id: 'Ok',
    defaultMessage: 'Ok',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
});

@injectIntl
@connect(
  (state, props) => ({
    content: state.content.data,
    deleteRequest: state.content.delete,
    pathname: props.location.pathname,
    returnUrl: props.location.query.return_url,
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
    returnUrl: PropTypes.string,
    intl: intlShape.isRequired,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    content: null,
    returnUrl: null,
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
      Router.push(
        this.props.returnUrl ||
          this.props.pathname.replace('/delete', '').replace(/\/[^/]*$/, ''),
      );
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
    Router.push(this.props.pathname.replace('/delete', ''));
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
          <Container>
            <Segment.Group raised>
              <Segment className="primary">
                <FormattedMessage
                  id="Do you really want to delete this item?"
                  defaultMessage="Do you really want to delete this item?"
                />
              </Segment>
              <Segment attached>
                <List bulleted>
                  <List.Item>{this.props.content.title}</List.Item>
                </List>
              </Segment>
              <Segment className="actions" clearing>
                <Button
                  basic
                  circular
                  primary
                  floated="right"
                  icon="arrow right"
                  title={this.props.intl.formatMessage(messages.ok)}
                  size="big"
                  onClick={this.onSubmit}
                />
                <Button
                  basic
                  circular
                  secondary
                  icon="remove"
                  title={this.props.intl.formatMessage(messages.cancel)}
                  floated="right"
                  size="big"
                  onClick={this.onCancel}
                />
              </Segment>
            </Segment.Group>
          </Container>
          <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
            <Toolbar pathname={this.props.pathname} inner={<span />} />
          </Portal>
        </div>
      );
    }
    return <div />;
  }
}
