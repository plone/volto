import { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { compose } from 'redux';
import { Button, Comment, Container, Icon } from 'semantic-ui-react';

import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import {
  addComment,
  deleteComment,
  listComments,
  listMoreComments,
} from '@plone/volto/actions/comments/comments';
import Avatar from '@plone/volto/components/theme/Avatar/Avatar';
import { Form } from '@plone/volto/components/manage/Form';
import { CommentEditModal } from '@plone/volto/components/theme/Comments';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers/Url/Url';
import { getColor } from '@plone/volto/helpers/Utils/Utils';
import { usePrevious } from '@plone/volto/helpers/Utils/usePrevious';

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
    id: 'You can add a comment by filling out the form below. Plain text formatting.',
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

const useComments = () => {
  const items = useSelector((state) => state.comments.items, shallowEqual);
  const next = useSelector((state) => state.comments.next, shallowEqual);
  const items_total = useSelector(
    (state) => state.comments.items_total,
    shallowEqual,
  );
  const permissions = useSelector(
    (state) => state.comments.permissions || {},
    shallowEqual,
  );
  const addRequest = useSelector((state) => state.comments.add, shallowEqual);
  const deleteRequest = useSelector(
    (state) => state.comments.delete,
    shallowEqual,
  );

  return { items, next, items_total, permissions, addRequest, deleteRequest };
};

const Comments = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { pathname } = props;
  const [showEdit, setshowEdit] = useState(false);
  const [editId, seteditId] = useState(null);
  const [editText, seteditText] = useState(null);
  const [replyTo, setreplyTo] = useState(null);
  const [collapsedComments, setcollapsedComments] = useState({});
  const { items, next, items_total, permissions, addRequest, deleteRequest } =
    useComments();

  const prevpathname = usePrevious(pathname);

  const prevaddRequestLoading = usePrevious(addRequest.loading);
  const prevdeleteRequestLoading = usePrevious(deleteRequest.loading);

  useEffect(() => {
    if (
      pathname !== prevpathname ||
      (prevaddRequestLoading && addRequest.loaded) ||
      (prevdeleteRequestLoading && deleteRequest.loaded)
    ) {
      dispatch(listComments(getBaseUrl(pathname)));
    }
  }, [
    dispatch,
    pathname,
    prevpathname,
    prevaddRequestLoading,
    addRequest.loaded,
    prevdeleteRequestLoading,
    deleteRequest.loaded,
  ]);

  const onSubmit = (formData) => {
    dispatch(addComment(getBaseUrl(pathname), formData.comment, replyTo));
    setreplyTo(null);
  };

  const setReplyTo = (commentId) => {
    setreplyTo(commentId);
  };

  const loadMoreComments = () => {
    dispatch(listMoreComments(flattenToAppURL(next)));
  };

  const onDelete = (value) => {
    dispatch(deleteComment(value));
  };
  const prevcollapsedComments = usePrevious(collapsedComments);

  const hideReply = (commentId) => {
    const hasComment = prevcollapsedComments[commentId];
    setcollapsedComments((prevState) => ({
      ...prevState,
      [commentId]: !hasComment,
    }));
  };

  const onEdit = useCallback((value) => {
    setshowEdit(true);
    seteditText(value.text);
    seteditId(value.id);
  }, []);

  const onEditOk = () => {
    setshowEdit(false);
    seteditId(null);
    seteditText(null);
    dispatch(listComments(getBaseUrl(pathname)));
  };

  const onEditCancel = useCallback(() => {
    setshowEdit(false);
    seteditId(null);
    seteditText(null);
    setreplyTo(null);
  }, []);

  const addRepliesAsChildrenToComments = (items) => {
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
  };

  const moment = props.moment.default;

  const allCommentsWithCildren = useMemo(
    () => addRepliesAsChildrenToComments(items),
    [items],
  );
  // all comments that are not a reply will be shown in the first iteration
  const allPrimaryComments = items.filter((comment) => !comment.in_reply_to);

  // recursively makes comments with their replies nested
  // each iteration will show replies to the specific comment using allCommentsWithCildren
  const commentElement = (comment) => (
    <Comment key={comment.comment_id} id={comment.comment_id}>
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
              aria-label={intl.formatMessage(messages.reply)}
              onClick={() => setReplyTo(comment.comment_id)}
            >
              <FormattedMessage id="Reply" defaultMessage="Reply" />
            </Comment.Action>
          )}
          {comment.is_editable && (
            <Comment.Action
              onClick={() =>
                onEdit({
                  id: flattenToAppURL(comment['@id']),
                  text: comment.text.data,
                })
              }
              aria-label={intl.formatMessage(messages.edit)}
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
              aria-label={intl.formatMessage(messages.delete)}
              onClick={() => onDelete(flattenToAppURL(comment['@id']))}
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
          <Comment.Action as="a" onClick={() => hideReply(comment.comment_id)}>
            {allCommentsWithCildren[comment.comment_id].children.length > 0 ? (
              collapsedComments[comment.comment_id] ? (
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
        open={showEdit}
        onCancel={onEditCancel}
        onOk={onEditOk}
        id={editId}
        text={editText}
      />
      {permissions.can_reply && (
        <div id="comment-add-id">
          <Form
            onSubmit={onSubmit}
            onCancel={onEditCancel}
            submitLabel={intl.formatMessage(messages.comment)}
            resetAfterSubmit
            schema={makeFormSchema(intl)}
          />
        </div>
      )}
      {/* all comments  */}
      <Comment.Group threaded id={'discussion'}>
        {allPrimaryComments.map((item) => commentElement(item))}
      </Comment.Group>

      {/* load more button */}
      {items_total > items.length && (
        <Button fluid basic color="blue" onClick={loadMoreComments}>
          <FormattedMessage id="Load more" defaultMessage="Load more..." />
        </Button>
      )}

      {replyTo &&
        document &&
        createPortal(
          <Form
            onSubmit={onSubmit}
            onCancel={onEditCancel}
            submitLabel={intl.formatMessage(messages.comment)}
            resetAfterSubmit
            schema={makeFormSchema(intl)}
          />,
          document.getElementById(`reply-place-${replyTo}`),
        )}
    </Container>
  );
};

Comments.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default compose(injectLazyLibs(['moment']))(Comments);
