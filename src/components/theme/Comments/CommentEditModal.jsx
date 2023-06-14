import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';

import { updateComment } from '@plone/volto/actions';
import { ModalForm } from '@plone/volto/components';
import { useComments } from '@plone/volto/hooks/comments/useComments';
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

const CommentEditModal = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { onOk } = props;
  const request = useComments();

  useEffect(() => {
    if (request.loading && request.loaded) {
      onOk();
    }
  }, [onOk, request]);

  const onSubmit = (data) => {
    dispatch(updateComment(props.id, data.text));
  };

  return (
    props.open && (
      <ModalForm
        open={props.open}
        onSubmit={onSubmit}
        onCancel={props.onCancel}
        formData={{ text: props.text }}
        title={intl.formatMessage(messages.editComment)}
        schema={{
          fieldsets: [
            {
              id: 'default',
              title: intl.formatMessage(messages.default),
              fields: ['text'],
            },
          ],
          properties: {
            text: {
              title: intl.formatMessage(messages.comment),
              type: 'string',
              description: '',
            },
          },
          required: ['text'],
        }}
      />
    )
  );
};

CommentEditModal.propTypes = {
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

CommentEditModal.defaultProps = {
  id: '',
  text: '',
};

export default CommentEditModal;
