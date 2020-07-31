/**
 * Comment edit modal.
 * @module components/theme/Comments/CommentEditModal
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { defineMessages, injectIntl } from 'react-intl';

import { updateComment } from '@plone/volto/actions';
import { ModalForm } from '@plone/volto/components';

const messages = defineMessages({
  editComment: {
    id: 'Edit comment',
    defaultMessage: 'Edit comment',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  comment: {
    id: 'Comment',
    defaultMessage: 'Comment',
  },
});

/**
 * CommentEditModal class.
 * @class CommentEditModal
 * @extends Component
 */
class CommentEditModal extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    updateComment: PropTypes.func.isRequired,
    id: PropTypes.string,
    text: PropTypes.string,
    request: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    open: PropTypes.bool.isRequired,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    id: '',
    text: '',
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs CommentEditModal
   */
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.request.loading && nextProps.request.loaded) {
      this.props.onOk();
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {Object} data Form data
   * @returns {undefined}
   */
  onSubmit(data) {
    this.props.updateComment(this.props.id, data.text);
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      this.props.open && (
        <ModalForm
          open={this.props.open}
          onSubmit={this.onSubmit}
          onCancel={this.props.onCancel}
          formData={{ text: this.props.text }}
          title={this.props.intl.formatMessage(messages.editComment)}
          schema={{
            fieldsets: [
              {
                id: 'default',
                title: this.props.intl.formatMessage(messages.default),
                fields: ['text'],
              },
            ],
            properties: {
              text: {
                title: this.props.intl.formatMessage(messages.comment),
                type: 'string',
                description: '',
              },
            },
            required: ['text'],
          }}
        />
      )
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state) => ({
      request: state.comments.update,
    }),
    { updateComment },
  ),
)(CommentEditModal);
