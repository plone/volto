import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { map } from 'lodash';
import { defineMessages, useIntl } from 'react-intl';

import { usePrevious } from '@plone/volto/helpers';
import { updateContent } from '@plone/volto/actions';
import { ModalForm } from '@plone/volto/components';

const messages = defineMessages({
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  tags: {
    id: 'Tags',
    defaultMessage: 'Tags',
  },
  tagsToRemove: {
    id: 'Tags to remove',
    defaultMessage: 'Tags to remove',
  },
  tagsToAdd: {
    id: 'Tags to add',
    defaultMessage: 'Tags to add',
  },
});

const ContentsTagsModal = (props) => {
  const { items, open, onCancel, onOk } = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const request = useSelector((state) => state.content.update);
  const prevrequestloading = usePrevious(request.loading);

  useEffect(() => {
    if (prevrequestloading && request.loaded) {
      onOk();
    }
  }, [onOk, prevrequestloading, request.loaded]);

  const onSubmit = useCallback(
    ({ tags_to_add = [], tags_to_remove = [] }) => {
      dispatch(
        updateContent(
          map(items, (item) => item.url),
          map(items, (item) => ({
            subjects: [
              ...new Set(
                (item.subjects ?? [])
                  .filter((s) => !tags_to_remove.includes(s))
                  .concat(tags_to_add),
              ),
            ],
          })),
        ),
      );
    },
    [dispatch, items],
  );

  const currentSetTags = useMemo(
    () => [...new Set(items.map((item) => item.subjects).flat())],
    [items],
  );

  return (
    open && (
      <ModalForm
        open={open}
        onSubmit={onSubmit}
        onCancel={onCancel}
        title={intl.formatMessage(messages.tags)}
        schema={{
          fieldsets: [
            {
              id: 'default',
              title: intl.formatMessage(messages.default),
              fields: ['tags_to_remove', 'tags_to_add'],
            },
          ],
          properties: {
            tags_to_remove: {
              type: 'array',
              widget: 'array',
              title: intl.formatMessage(messages.tagsToRemove),
              choices: currentSetTags.map((tag) => [tag, tag]),
            },
            tags_to_add: {
              type: 'array',
              widget: 'token',
              title: intl.formatMessage(messages.tagsToAdd),
              items: {
                vocabulary: { '@id': 'plone.app.vocabularies.Keywords' },
              },
            },
          },
          required: [],
        }}
      />
    )
  );
};

ContentsTagsModal.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      subjects: PropTypes.arrayOf(PropTypes.string),
      url: PropTypes.string,
    }),
  ).isRequired,
  open: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
export default ContentsTagsModal;
