/**
 * Comments components.
 * @module components/theme/Comments/Comments
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import moment from 'moment';
import { Button, Grid, Segment, Container } from 'semantic-ui-react';
import { settings } from '~/config';

import { addComment, deleteComment, listComments } from '@plone/volto/actions';
import { getBaseUrl } from '@plone/volto/helpers';
import { CommentEditModal, Form } from '@plone/volto/components';

const messages = defineMessages({
  comment: {
    id: 'Comment',
    defaultMessage: 'Comment',
  },
  commentDescription: {
    id:
      'You can add a comment by filling out the form below. Plain text formatting.',
    defaultMessage:
      'You can add a comment by filling out the form below. Plain text formatting.',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  delete: {
    id: 'Delete',
    defaultMessage: 'Delete',
  },
  edit: {
    id: 'Edit',
    defaultMessage: 'Edit',
  },
});

/**
 * Comments container class.
 * @class Comments
 * @extends Component
 */
class Comments extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    addComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    listComments: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        author_name: PropTypes.string,
        creation_date: PropTypes.string,
        text: PropTypes.shape({
          data: PropTypes.string,
          'mime-type': PropTypes.string,
        }),
        is_deletable: PropTypes.bool,
        is_editable: PropTypes.bool,
      }),
    ).isRequired,
    addRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    deleteRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Comments
   */
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onEditOk = this.onEditOk.bind(this);
    this.onEditCancel = this.onEditCancel.bind(this);
    this.state = {
      showEdit: false,
      editId: null,
      editText: null,
    };
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  UNSAFE_componentWillMount() {
    this.props.listComments(getBaseUrl(this.props.pathname));
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.pathname !== this.props.pathname ||
      (this.props.addRequest.loading && nextProps.addRequest.loaded) ||
      (this.props.deleteRequest.loading && nextProps.deleteRequest.loaded)
    ) {
      this.props.listComments(getBaseUrl(nextProps.pathname));
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {Object} formData Form data.
   * @returns {undefined}
   */
  onSubmit(formData) {
    this.props.addComment(getBaseUrl(this.props.pathname), formData.comment);
  }

  /**
   * Delete handler
   * @method onDelete
   * @param {Object} event Event object.
   * @param {string} value Delete value.
   * @returns {undefined}
   */
  onDelete(event, { value }) {
    this.props.deleteComment(value);
  }

  /**
   * Edit handler
   * @method onEdit
   * @param {Object} event Event object.
   * @param {string} value Delete value.
   * @returns {undefined}
   */
  onEdit(event, { value }) {
    this.setState({
      showEdit: true,
      editId: value.id,
      editText: value.text,
    });
  }

  /**
   * On edit ok
   * @method onEditOk
   * @returns {undefined}
   */
  onEditOk() {
    this.setState({
      showEdit: false,
      editId: null,
      editText: null,
    });
    this.props.listComments(getBaseUrl(this.props.pathname));
  }

  /**
   * On edit cancel
   * @method onEditCancel
   * @returns {undefined}
   */
  onEditCancel() {
    this.setState({
      showEdit: false,
      editId: null,
      editText: null,
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Container className="comments">
        <CommentEditModal
          open={this.state.showEdit}
          onCancel={this.onEditCancel}
          onOk={this.onEditOk}
          id={this.state.editId}
          text={this.state.editText}
        />
        {this.props.items.map((item) => [
          <div className="comment" key={item['@id']}>
            <Grid stackable>
              <Grid.Column width={6}>
                <FormattedMessage
                  id="{user} says:"
                  defaultMessage="{user} says:"
                  values={{
                    user: <span>{item.author_name}</span>,
                  }}
                />
              </Grid.Column>
              <Grid.Column width={6} textAlign="right">
                <span title={moment(item.creation_date).format('LLLL')}>
                  {moment(item.creation_date).fromNow()}
                </span>
              </Grid.Column>
            </Grid>
            <Segment clearing>
              {item.text['mime-type'] === 'text/html' ? (
                <div dangerouslySetInnerHTML={{ __html: item.text.data }} />
              ) : (
                item.text.data
              )}
              {item.is_deletable && (
                <Button
                  aria-label={this.props.intl.formatMessage(messages.delete)}
                  onClick={this.onDelete}
                  value={item['@id'].replace(settings.apiPath, '')}
                  color="red"
                  floated="right"
                >
                  <FormattedMessage id="Delete" defaultMessage="Delete" />
                </Button>
              )}
              {item.is_editable && (
                <Button
                  aria-label={this.props.intl.formatMessage(messages.edit)}
                  onClick={this.onEdit}
                  floated="right"
                  value={{
                    id: item['@id'].replace(settings.apiPath, ''),
                    text: item.text.data,
                  }}
                >
                  <FormattedMessage id="Edit" defaultMessage="Edit" />
                </Button>
              )}
            </Segment>
            <br />
          </div>,
        ])}
        <Form
          onSubmit={this.onSubmit}
          submitLabel={this.props.intl.formatMessage(messages.comment)}
          resetAfterSubmit
          title={this.props.intl.formatMessage(messages.comment)}
          schema={{
            fieldsets: [
              {
                fields: ['comment'],
                id: 'default',
                title: this.props.intl.formatMessage(messages.default),
              },
            ],
            properties: {
              comment: {
                title: this.props.intl.formatMessage(messages.comment),
                type: 'string',
                widget: 'textarea',
              },
            },
            required: ['comment'],
          }}
        />
      </Container>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state) => ({
      items: state.comments.items,
      addRequest: state.comments.add,
      deleteRequest: state.comments.delete,
    }),
    { addComment, deleteComment, listComments },
  ),
)(Comments);
