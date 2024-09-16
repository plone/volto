import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { concat, merge, map } from 'lodash-es';
import { defineMessages, useIntl } from 'react-intl';

import { usePrevious } from '@plone/volto/helpers';
import { updateContent } from '@plone/volto/actions';
import { ModalForm } from '@plone/volto/components/manage/Form';

const messages = defineMessages({
  renameItems: {
    id: 'Rename items',
    defaultMessage: 'Rename items',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  shortName: {
    id: 'Short name',
    defaultMessage: 'Short name',
  },
  shortNameDescription: {
    id: 'This name will be displayed in the URL.',
    defaultMessage: 'This name will be displayed in the URL.',
  },
  loadingMessage: {
    id: 'Rename Items Loading Message',
    defaultMessage: 'Renaming items...',
  },
});

const ContentsRenameModal = (props) => {
  const { onOk, open, items, onCancel } = props;
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
    (data) => {
      dispatch(
        updateContent(
          map(items, (item) => item.url),
          map(items, (item, index) => ({
            id: data[`${index}_id`],
            title: data[`${index}_title`],
          })),
        ),
      );
    },
    [items, dispatch],
  );

  return (
    open && (
      <ModalForm
        open={open}
        loading={request.loading}
        loadingMessage={intl.formatMessage(messages.loadingMessage)}
        onSubmit={onSubmit}
        onCancel={onCancel}
        formData={merge(
          ...map(items, (item, index) => ({
            [`${index}_title`]: item.title,
            [`${index}_id`]: item.id,
          })),
        )}
        title={intl.formatMessage(messages.renameItems)}
        schema={{
          fieldsets: [
            {
              id: 'default',
              title: intl.formatMessage(messages.default),
              fields: concat(
                ...map(items, (item, index) => [
                  `${index}_title`,
                  `${index}_id`,
                ]),
              ),
            },
          ],
          properties: merge(
            ...map(items, (item, index) => ({
              [`${index}_title`]: {
                title: intl.formatMessage(messages.title),
                type: 'string',
                description: '',
              },
              [`${index}_id`]: {
                title: intl.formatMessage(messages.shortName),
                type: 'id',
                description: intl.formatMessage(messages.shortNameDescription),
              },
            })),
          ),
          required: [],
        }}
      />
    )
  );
};

ContentsRenameModal.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string,
    }),
  ).isRequired,
  open: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ContentsRenameModal;
