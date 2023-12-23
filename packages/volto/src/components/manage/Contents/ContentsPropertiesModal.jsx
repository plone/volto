import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, map } from 'lodash';
import { defineMessages, useIntl } from 'react-intl';

import { usePrevious } from '@plone/volto/helpers';
import { updateContent } from '@plone/volto/actions';
import { ModalForm } from '@plone/volto/components/manage/Form';

const messages = defineMessages({
  properties: {
    id: 'Properties',
    defaultMessage: 'Properties',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  effectiveTitle: {
    id: 'Publishing Date',
    defaultMessage: 'Publishing Date',
  },
  effectiveDescription: {
    id: 'If this date is in the future, the content will not show up in listings and searches until this date.',
    defaultMessage:
      'If this date is in the future, the content will not show up in listings and searches until this date.',
  },
  expiresTitle: {
    id: 'Expiration Date',
    defaultMessage: 'Expiration Date',
  },
  expiresDescription: {
    id: 'When this date is reached, the content will nolonger be visible in listings and searches.',
    defaultMessage:
      'When this date is reached, the content will nolonger be visible in listings and searches.',
  },
  rightsTitle: {
    id: 'Rights',
    defaultMessage: 'Rights',
  },
  rightsDescription: {
    id: 'Copyright statement or other rights information on this item.',
    defaultMessage:
      'Copyright statement or other rights information on this item.',
  },
  creatorsTitle: {
    id: 'Creators',
    defaultMessage: 'Creators',
  },
  creatorsDescription: {
    id: 'Persons responsible for creating the content of this item. Please enter a list of user names, one per line. The principal creator should come first.',
    defaultMessage:
      'Persons responsible for creating the content of this item. Please enter a list of user names, one per line. The principal creator should come first.',
  },
  excludeFromNavTitle: {
    id: 'Exclude from navigation',
    defaultMessage: 'Exclude from navigation',
  },
  excludeFromNavDescription: {
    id: 'If selected, this item will not appear in the navigation tree',
    defaultMessage:
      'If selected, this item will not appear in the navigation tree',
  },
});

const ContentsPropertiesModal = (props) => {
  const { onCancel, onOk, open, items } = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const request = useSelector((state) => state.content.update);
  const prevrequestloading = usePrevious(request.loading);

  useEffect(() => {
    if (prevrequestloading && request.loaded) {
      onOk();
    }
  }, [onOk, prevrequestloading, request.loaded]);

  const onSubmit = (data) => {
    if (isEmpty(data)) {
      onOk();
    } else {
      dispatch(
        updateContent(
          items,
          map(items, () => data),
        ),
      );
    }
  };

  return (
    open && (
      <ModalForm
        open={open}
        onSubmit={onSubmit}
        onCancel={onCancel}
        title={intl.formatMessage(messages.properties)}
        schema={{
          fieldsets: [
            {
              id: 'default',
              title: intl.formatMessage(messages.default),
              fields: [
                'effective',
                'expires',
                'rights',
                'creators',
                'exclude_from_nav',
              ],
            },
          ],
          properties: {
            effective: {
              description: intl.formatMessage(messages.effectiveDescription),
              title: intl.formatMessage(messages.effectiveTitle),
              type: 'string',
              widget: 'datetime',
            },
            expires: {
              description: intl.formatMessage(messages.expiresDescription),
              title: intl.formatMessage(messages.expiresTitle),
              type: 'string',
              widget: 'datetime',
            },
            rights: {
              description: intl.formatMessage(messages.rightsDescription),
              title: intl.formatMessage(messages.rightsTitle),
              type: 'string',
              widget: 'textarea',
            },
            creators: {
              description: intl.formatMessage(messages.creatorsDescription),
              title: intl.formatMessage(messages.creatorsTitle),
              type: 'array',
            },
            exclude_from_nav: {
              description: intl.formatMessage(
                messages.excludeFromNavDescription,
              ),
              title: intl.formatMessage(messages.excludeFromNavTitle),
              type: 'boolean',
            },
          },
          required: [],
        }}
      />
    )
  );
};

ContentsPropertiesModal.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  open: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
export default ContentsPropertiesModal;
