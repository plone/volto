/**
 * Comments components.
 * @module components/theme/Comments/Comments
 */

import {
  addComment,
  deleteComment,
  listComments,
  listMoreComments,
} from '@plone/volto/actions';
import { Avatar, CommentEditModal, Form } from '@plone/volto/components';
import { flattenToAppURL, getBaseUrl, getColor } from '@plone/volto/helpers';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import { Portal } from 'react-portal';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Comment, Container, Icon } from 'semantic-ui-react';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
// import { Button, Grid, Segment, Container } from 'semantic-ui-react';

const messages = defineMessages({
  comment: {
    id: 'Comment',
    defaultMessage: 'Comment',
  },
  comments: {
    id: 'Comments',
    defaultMessage: 'Comments',
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
  reply: {
    id: 'Reply',
    defaultMessage: 'Reply',
  },
  hideReplies: {
    id: 'Hide Replies',
    defaultMessage: 'Hide Replies',
  },
  showReplies: {
    id: 'Show Replies',
    defaultMessage: 'Show Replies',
  },
  loadMoreComments: {
    id: 'Load more',
    defaultMessage: 'Load more...',
  },
});
/**
 * Schema for the Form components to show an input field with it's label
 * @param {Object} intl
 */
const makeFormSchema = (intl) => ({
  fieldsets: [
    {
      fields: ['comment'],
      id: 'default',
      title: intl.formatMessage(messages.default),
    },
  ],
  properties: {
    comment: {
      title: intl.formatMessage(messages.comment),
      type: 'string',
      widget: 'textarea',
    },
  },
  required: ['comment1'],
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
    listMoreComments: PropTypes.func.isRequired,
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
    this.setReplyTo = this.setReplyTo.bind(this);
    this.loadMoreComments = this.loadMoreComments.bind(this);
    this.state = {
      showEdit: false,
      editId: null,
      editText: null,
      replyTo: null,
      collapsedComments: {},
    };
  }

  componentDidMount() {
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
    this.props.addComment(
      getBaseUrl(this.props.pathname),
      formData.comment,
      this.state.replyTo,
    );
    this.setState({ replyTo: null });
  }

  /**
   * The id of the comment that will receive a reply
   * @param {string} commentId
   */
  setReplyTo(commentId) {
    this.setState({ replyTo: commentId });
  }

  /**
   * Calls the action listMoreComments passing the received url for next array of comments
   */
  loadMoreComments() {
    this.props.listMoreComments(this.props.next);
  }

  /**
   * Delete handler
   * @method onDelete
   * @param {Object} event Event object.
   * @param {string} value Delete value.
   * @returns {undefined}
   */
  onDelete(value) {
    this.props.deleteComment(value);
  }

  /**
   * Will hide all replies to the specific comment
   * including replies to any of the replies
   * @param {string} commentId
   */
  hideReply(commentId) {
    this.setState((prevState) => {
      const hasComment = prevState.collapsedComments[commentId];
      const { collapsedComments } = prevState;

      return {
        collapsedComments: {
          ...collapsedComments,
          [commentId]: !hasComment,
        },
      };
    });
  }

  /**
   * Edit handler
   * @method onEdit
   * @param {Object} event Event object.
   * @param {string} value Delete value.
   * @returns {undefined}
   */
  onEdit(value) {
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
  onEditCancel(ev) {
    this.setState({
      showEdit: false,
      editId: null,
      editText: null,
      replyTo: null,
    });
  }

  addRepliesAsChildrenToComments(items) {
    let initialValue = {};
    const allCommentsWithCildren = items.reduce((accumulator, item) => {
      return {
        [item.comment_id]: { comment: item, children: [] },
        ...accumulator,
      };
    }, initialValue);

    items.forEach((comment) => {
      if (comment.in_reply_to) {
        allCommentsWithCildren[comment.in_reply_to].children.push(comment);
      }
    });
    return allCommentsWithCildren;
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { items, permissions } = this.props;
    const moment = this.props.moment.default;
    const { collapsedComments } = this.state;
    // object with comment ids, to easily verify if any comment has children
    const allCommentsWithCildren = this.addRepliesAsChildrenToComments(items);
    // all comments that are not a reply will be shown in the first iteration
    const allPrimaryComments = items.filter((comment) => !comment.in_reply_to);

    // recursively makes comments with their replies nested
    // each iteration will show replies to the specific comment using allCommentsWithCildren
    const commentElement = (comment) => (
      <Comment key={comment.comment_id}>
        <Avatar
          src={flattenToAppURL(comment.author_image)}
          title={comment.author_name || 'Anonymous'}
          color={getColor(comment.author_username)}
        />
        <Comment.Content>
          <Comment.Author>{comment.author_name}</Comment.Author>
          <Comment.Metadata>
            <span>
              {' '}
              <span title={moment(comment.creation_date).format('LLLL')}>
                {moment(comment.creation_date).fromNow()}
              </span>
            </span>
          </Comment.Metadata>
          <Comment.Text>
            {' '}
            {comment.text['mime-type'] === 'text/html' ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: comment.text.data,
                }}
              />
            ) : (
              comment.text.data
            )}
          </Comment.Text>
          <Comment.Actions>
            {comment.can_reply && (
              <Comment.Action
                as="a"
                aria-label={this.props.intl.formatMessage(messages.reply)}
                onClick={() => this.setReplyTo(comment.comment_id)}
              >
                <FormattedMessage id="Reply" defaultMessage="Reply" />
              </Comment.Action>
            )}
            {comment.is_editable && (
              <Comment.Action
                onClick={() =>
                  this.onEdit({
                    id: flattenToAppURL(comment['@id']),
                    text: comment.text.data,
                  })
                }
                aria-label={this.props.intl.formatMessage(messages.edit)}
                value={{
                  id: flattenToAppURL(comment['@id']),
                  text: comment.text.data,
                }}
              >
                <FormattedMessage id="Edit" defaultMessage="Edit" />
              </Comment.Action>
            )}
            {comment.is_deletable && (
              <Comment.Action
                aria-label={this.props.intl.formatMessage(messages.delete)}
                onClick={() => this.onDelete(flattenToAppURL(comment['@id']))}
                color="red"
              >
                <Icon name="delete" color="red" />
                <FormattedMessage
                  id="Delete"
                  defaultMessage="Delete"
                  color="red"
                />
              </Comment.Action>
            )}
            <Comment.Action
              as="a"
              onClick={() => this.hideReply(comment.comment_id)}
            >
              {allCommentsWithCildren[comment.comment_id].children.length >
              0 ? (
                this.state.collapsedComments[comment.comment_id] ? (
                  <>
                    <Icon name="eye" color="blue" />
                    <FormattedMessage
                      id="Show Replies"
                      defaultMessage="Show Replies"
                    />
                  </>
                ) : (
                  <>
                    <Icon name="minus" color="blue" />
                    <FormattedMessage
                      id="Hide Replies"
                      defaultMessage="Hide Replies"
                    />
                  </>
                )
              ) : null}
            </Comment.Action>
          </Comment.Actions>
          <div id={`reply-place-${comment.comment_id}`}></div>
        </Comment.Content>

        {allCommentsWithCildren[comment.comment_id].children.length > 0
          ? allCommentsWithCildren[comment.comment_id].children.map(
              (child, index) => (
                <Comment.Group
                  collapsed={collapsedComments[comment.comment_id]}
                  key={`group-${index}-${comment.comment_id}`}
                >
                  {commentElement(child)}
                </Comment.Group>
              ),
            )
          : null}
      </Comment>
    );

    if (!permissions.view_comments) return '';

    return (
      <Container className="comments">
        <CommentEditModal
          open={this.state.showEdit}
          onCancel={this.onEditCancel}
          onOk={this.onEditOk}
          id={this.state.editId}
          text={this.state.editText}
        />
        {permissions.can_reply && (
          <div id="comment-add-id">
            <Form
              onSubmit={this.onSubmit}
              onCancel={this.onEditCancel}
              submitLabel={this.props.intl.formatMessage(messages.comment)}
              resetAfterSubmit
              schema={makeFormSchema(this.props.intl)}
            />
          </div>
        )}
        {/* all comments  */}
        <Comment.Group threaded>
          {allPrimaryComments.map((item) => commentElement(item))}
        </Comment.Group>

        {/* load more button */}
        {this.props.items_total > this.props.items.length && (
          <Button fluid basic color="blue" onClick={this.loadMoreComments}>
            <FormattedMessage id="Load more" defaultMessage="Load more..." />
          </Button>
        )}

        {this.state.replyTo && (
          <Portal
            node={
              document &&
              document.getElementById(`reply-place-${this.state.replyTo}`)
            }
          >
            <Form
              onSubmit={this.onSubmit}
              onCancel={this.onEditCancel}
              submitLabel={this.props.intl.formatMessage(messages.comment)}
              resetAfterSubmit
              schema={makeFormSchema(this.props.intl)}
            />
          </Portal>
        )}
      </Container>
    );
  }
}

export default compose(
  injectIntl,
  injectLazyLibs(['moment']),
  connect(
    (state) => ({
      items: state.comments.items,
      next: state.comments.next,
      items_total: state.comments.items_total,
      permissions: state.comments.permissions || {},
      addRequest: state.comments.add,
      deleteRequest: state.comments.delete,
    }),
    { addComment, deleteComment, listComments, listMoreComments },
  ),
)(Comments);
