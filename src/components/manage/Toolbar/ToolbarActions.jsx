import React from 'react';
import { filter, find } from 'lodash';
import { Link } from 'react-router-dom';
import { defineMessages, injectIntl } from 'react-intl';
import penSVG from '@plone/volto/icons/pen.svg';
import { Icon } from '@plone/volto/components/theme/Icon/Icon';
import { getBaseUrl } from '@plone/volto/helpers';

const messages = defineMessages({
  edit: {
    id: 'Edit',
    defaultMessage: 'Edit',
  },
  contents: {
    id: 'Contents',
    defaultMessage: 'Contents',
  },
  add: {
    id: 'Add',
    defaultMessage: 'Add',
  },
  more: {
    id: 'More',
    defaultMessage: 'More',
  },
  personalTools: {
    id: 'Personal tools',
    defaultMessage: 'Personal tools',
  },
  shrinkToolbar: {
    id: 'Shrink toolbar',
    defaultMessage: 'Shrink toolbar',
  },
  personalInformation: {
    id: 'Personal Information',
    defaultMessage: 'Personal Information',
  },
  personalPreferences: {
    id: 'Personal Preferences',
    defaultMessage: 'Personal Preferences',
  },
  collection: {
    id: 'Collection',
    defaultMessage: 'Collection',
  },
  file: {
    id: 'File',
    defaultMessage: 'File',
  },
  link: {
    id: 'Link',
    defaultMessage: 'Link',
  },
  newsItem: {
    id: 'News Item',
    defaultMessage: 'News Item',
  },
  page: {
    id: 'Page',
    defaultMessage: 'Page',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
});

const EditAction = (props) => {
  const editAction = find(this.props.actions.object, { id: 'edit' });
  const path = getBaseUrl(this.props.pathname);

  return (
    editAction && (
      <Link
        aria-label={this.props.intl.formatMessage(messages.edit)}
        className="edit"
        to={`${path}/edit`}
      >
        <Icon name={penSVG} size="30px" className="circled" />
      </Link>
    )
  );
};
