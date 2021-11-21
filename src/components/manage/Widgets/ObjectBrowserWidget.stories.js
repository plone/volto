import ObjectBrowserWidgetDefault, {
  ObjectBrowserWidgetComponent as OBC,
} from './ObjectBrowserWidget';
import Wrapper from '@plone/volto/storybook';
import React from 'react';
import { injectIntl } from 'react-intl';
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
    },
  },
  userSession: { token: '1234' },
  intl: {
    locale: 'en',
    messages: {},
  },
};

const ObjectBrowserWidgetComponent = (args) => {
  const IntlWrappedComponent = injectIntl(OBC);
  return (
    <Wrapper>
      <IntlWrappedComponent {...args} search={searchResults} />
    </Wrapper>
  );
};

const ObjectBrowserWidget = (args) => {
  const [value, setValue] = React.useState([]);
  const onChange = (block, value) => setValue(value);

  return (
    <Wrapper
      location={{ pathname: '/folder2/folder21/doc212' }}
      customStore={customStore}
    >
      <ObjectBrowserWidgetDefault
        {...args}
        id="objectBrowser"
        title="Object Browser"
        block="testBlock"
        value={value}
        onChange={onChange}
      />
      {value?.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <UniversalLink item={value[0]}>{value[0]['@id']}</UniversalLink>
        </div>
      )}
    </Wrapper>
  );
};

export default {
  title: 'Internal Components/Object Browser',
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

export const Renderer = () => (
  <ObjectBrowserWidgetComponent search={searchResults} />
);

export const Connected = () => <ObjectBrowserWidget />;
export const SingleElement = () => <ObjectBrowserWidget mode="link" />;
