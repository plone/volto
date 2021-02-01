import React from 'react';
import { defineMessages } from 'react-intl';

import More from '@plone/volto/components/manage/Toolbar/More';
import PersonalTools from '@plone/volto/components/manage/Toolbar/PersonalTools';
import Types from '@plone/volto/components/manage/Toolbar/Types';
import PersonalInformation from '@plone/volto/components/manage/Preferences/PersonalInformation';
import PersonalPreferences from '@plone/volto/components/manage/Preferences/PersonalPreferences';
import StandardWrapper from '@plone/volto/components/manage/Toolbar/StandardWrapper';

import {
  EditButton,
  AddButton,
  ContentsButton,
  MoreButton,
  DisplayAction,
  HistoryAction,
  SharingAction,
  ManageTranslations,
} from '@plone/volto/components/manage/Toolbar/ToolbarComponents';

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

const toolbarComponents = {
  personalTools: { component: PersonalTools, wrapper: null },
  more: { component: More, wrapper: null },
  types: { component: Types, wrapper: null, contentAsProps: true },
  profile: {
    component: PersonalInformation,
    wrapper: StandardWrapper,
    wrapperTitle: messages.personalInformation,
    hideToolbarBody: true, // shows a second 'view' once clicked
  },
  preferences: {
    component: PersonalPreferences,
    wrapper: StandardWrapper,
    wrapperTitle: messages.personalPreferences,
    hideToolbarBody: true,
  },
};

const more = (actions) => {
  return () => <MoreButton />;
};

const bottom = (actions) => {
  return () => <div>Bottom</div>;
};

const defaultMoreActions = [
  DisplayAction,
  HistoryAction,
  SharingAction,
  ManageTranslations,
];

const defaultBottomActions = [
  //
];

const activities = {
  view: {
    top: [EditButton, ContentsButton, AddButton, more(defaultMoreActions)],
    bottom: [bottom(defaultBottomActions)],
  },
  add: {
    top: [],
    bottom: [bottom(defaultBottomActions)],
  },
  edit: {
    top: [],
    bottom: [bottom(defaultBottomActions)],
  },
};

export const defaultToolbar = {
  toolbarComponents,
  activities,
  defaultMoreActions,
};
