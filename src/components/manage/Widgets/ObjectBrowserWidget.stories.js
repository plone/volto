import ObjectBrowserWidgetDefault, {
  ObjectBrowserWidgetComponent as OBC,
} from './ObjectBrowserWidget';
import Wrapper, { FormUndoWrapper } from '@plone/volto/storybook';
import React from 'react';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';

export const searchResults = {
  items: [
    {
      '@id': '/front-page',
      '@type': 'Document',
      CreationDate: '2019-08-19T10:13:54+02:00',
      Creator: 'admin',
      Date: '2019-08-19T10:13:54+02:00',
      Description: 'Congratulations! You have successfully installed Plone.',
      EffectiveDate: 'None',
      ExpirationDate: 'None',
      ModificationDate: '2019-08-19T10:13:54+02:00',
      Subject: [],
      Title: 'Welcome to Plone',
      Type: 'Page',
      UID: 'd4eea28b0d53439389f6f0d647de37f7',
      author_name: null,
      cmf_uid: 1,
      commentators: [],
      created: '2019-08-19T08:13:54+00:00',
      description: 'Congratulations! You have successfully installed Plone.',
      effective: '1969-12-30T22:00:00+00:00',
      end: null,
      exclude_from_nav: false,
      expires: '2499-12-30T22:00:00+00:00',
      getId: 'front-page',
      getObjSize: '4.6 KB',
      getPath: '/Plone/front-page',
      getRemoteUrl: null,
      getURL: 'http://localhost:8080/Plone/front-page',
      id: 'front-page',
      in_response_to: null,
      is_folderish: false,
      last_comment_date: null,
      listCreators: ['admin'],
      location: null,
      meta_type: 'Dexterity Item',
      mime_type: 'text/plain',
      modified: '2019-08-19T08:13:54+00:00',
      portal_type: 'Document',
      review_state: 'published',
      start: null,
      sync_uid: null,
      title: 'Welcome to Plone',
      total_comments: 0,
    },
    {
      '@id': '/image',
      '@type': 'Image',
      CreationDate: '2019-08-19T10:13:54+02:00',
      Creator: 'admin',
      Date: '2019-08-19T10:13:54+02:00',
      Description: 'This is an image',
      EffectiveDate: 'None',
      ExpirationDate: 'None',
      ModificationDate: '2019-08-19T10:13:54+02:00',
      Subject: [],
      Title: 'I am an image',
      Type: 'Image',
      UID: 'd4eea28b0d53439389f6f0d647de37f7',
      author_name: null,
      cmf_uid: 1,
      commentators: [],
      created: '2019-08-19T08:13:54+00:00',
      description: 'Congratulations! You have successfully installed Plone.',
      effective: '1969-12-30T22:00:00+00:00',
      end: null,
      exclude_from_nav: false,
      expires: '2499-12-30T22:00:00+00:00',
      getId: 'image',
      getObjSize: '4.6 KB',
      getPath: '/Plone/image',
      getRemoteUrl: null,
      getURL: 'http://localhost:8080/Plone/image',
      id: 'image',
      in_response_to: null,
      is_folderish: false,
      last_comment_date: null,
      listCreators: ['admin'],
      location: null,
      meta_type: 'Dexterity Item',
      mime_type: 'text/plain',
      modified: '2019-08-19T08:13:54+00:00',
      portal_type: 'Image',
      review_state: 'published',
      start: null,
      sync_uid: null,
      title: 'I am an image',
      total_comments: 0,
    },
    {
      '@id': '/news',
      '@type': 'Folder',
      CreationDate: '2019-08-19T10:13:54+02:00',
      Creator: 'admin',
      Date: '2019-08-19T10:13:54+02:00',
      Description: 'Site News',
      EffectiveDate: 'None',
      ExpirationDate: 'None',
      ModificationDate: '2019-08-19T10:13:54+02:00',
      Subject: [],
      Title: 'News',
      Type: 'Folder',
      UID: 'e5e494af671d4764a6ca417ab9c2348a',
      author_name: null,
      cmf_uid: null,
      commentators: [],
      created: '2019-08-19T08:13:54+00:00',
      description: 'Site News',
      effective: '1969-12-30T22:00:00+00:00',
      end: null,
      exclude_from_nav: false,
      expires: '2499-12-30T22:00:00+00:00',
      getId: 'news',
      getObjSize: '0 KB',
      getPath: '/Plone/news',
      getRemoteUrl: null,
      getURL: 'http://localhost:8080/Plone/news',
      id: 'news',
      in_response_to: null,
      is_folderish: true,
      last_comment_date: null,
      listCreators: ['admin'],
      location: null,
      meta_type: 'Dexterity Container',
      mime_type: 'text/plain',
      modified: '2019-08-19T08:13:54+00:00',
      portal_type: 'Folder',
      review_state: 'published',
      start: null,
      sync_uid: null,
      title: 'News',
      total_comments: 0,
    },
  ],
};

const customStore = {
  search: {
    subrequests: {
      'testBlock-multiple': searchResults,
      'testBlock-link': searchResults,
      'testBlock-image': searchResults,
    },
  },
  userSession: { token: '1234' },
  intl: {
    locale: 'en',
    messages: {},
  },
};

const ObjectBrowserWidget = (args) => {
  return (
    <Wrapper
      location={{ pathname: '/folder2/folder21/doc212' }}
      customStore={customStore}
    >
      <FormUndoWrapper initialState={{ value: undefined }} showControls={true}>
        {({ state, onChange }) => (
          <>
            <ObjectBrowserWidgetDefault
              {...args}
              id="objectBrowser"
              title="Object Browser"
              block="testBlock"
              value={state.value}
              onChange={(block, value) => onChange({ value })}
            />
            <pre>
              Value:
              {state.value?.length > 0 && (
                <UniversalLink item={state.value[0]}>
                  {state.value[0]['@id']}
                </UniversalLink>
              )}
            </pre>
          </>
        )}
      </FormUndoWrapper>
    </Wrapper>
  );
};

export default {
  title: 'Edit Widgets/Object Browser',
  argTypes: {
    selectableTypes: {
      name: 'widgetOptions.pattern_options.selectableTypes',
      description: 'List of content type names that can be selected',
      table: {
        type: {
          summary: 'Something short',
          detail: 'Something really really long',
        },
      },
      control: {
        type: null,
      },
    },
  },
  component: OBC,
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  excludeStories: ['searchResults'],
  // subcomponents: { ArgsTable },
};

export const Connected = () => <ObjectBrowserWidget />;
export const SingleElement = () => <ObjectBrowserWidget mode="link" />;
export const Placeholder = () => (
  <ObjectBrowserWidget
    allowExternals={true}
    placeholder="This is the placeholder text"
  />
);
export const Image = () => <ObjectBrowserWidget mode="image" return="single" />;
export const InitalPath = () => <ObjectBrowserWidget initialPath="/" />;
export const SelectableType = () => (
  <ObjectBrowserWidget
    widgetOptions={{
      pattern_options: { selectableTypes: ['Folder', 'Image', 'Event'] },
    }}
  />
);
