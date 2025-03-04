import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';

import { usePrevious } from '@plone/volto/helpers';
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

const CommentEditModal = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { onOk, open, onCancel } = props;
  const request = useSelector((state) => state.comments.update, shallowEqual);

  const prevRequestLoading = usePrevious(request.loading);

  useEffect(() => {
    if (prevRequestLoading && request.loaded) {
      onOk();
    }
  }, [onOk, prevRequestLoading, request.loaded]);

  const onSubmit = (data) => {
    dispatch(updateComment(props.id, data.text));
  };

  return (
    props.open && (
      <ModalForm
        open={open}
        onSubmit={onSubmit}
        onCancel={onCancel}
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
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  request: PropTypes.shape({
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
  }),
  open: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

CommentEditModal.defaultProps = {
  id: '',
  text: '',
};

export default CommentEditModal;
