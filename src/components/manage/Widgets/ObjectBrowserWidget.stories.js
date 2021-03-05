import ObjectBrowserWidgetDefault, {
  ObjectBrowserWidgetComponent as OBC,
} from './ObjectBrowserWidget';
import Wrapper from '@plone/volto/storybook';
import React from 'react';
import { injectIntl } from 'react-intl';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';

const search = {
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
      'testBlock-multiple': search,
      'testBlock-link': search,
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
      <style dangerouslySetInnerHTML={{ __html: style }}></style>
      <IntlWrappedComponent {...args} search={search} />
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
      <style dangerouslySetInnerHTML={{ __html: style }}></style>
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
  title: 'Object Browser',
  component: OBC,
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  // subcomponents: { ArgsTable },
};

export const Renderer = () => <ObjectBrowserWidgetComponent search={search} />;

export const Connected = () => <ObjectBrowserWidget />;
export const SingleElement = () => <ObjectBrowserWidget mode="link" />;

const style = `
.list .content .list a {
  padding-left: 2rem !important;
}

.in_path {
  font-weight: bold !important;
}

.list .content .list {
  padding-top: 0!important;
  padding-bottom: 0!important;

  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.context-navigation {
  margin-right: 1rem;;
  background     : white;
  padding        : 0;
  max-width      : 210px;
  box-shadow     : 0px 0px 12px rgba(0, 0, 0, 0.2);
  list-style-type: none;
  border-radius  : 4px;
  overflow       : hidden;
}

@media(max-width: 1200px) {
  .context-navigation {
    /* margin-right: 0; */
    margin-top: 2rem;
    box-shadow: none;
    max-width: 200px;
    margin: 2rem auto;
  }
}

.context-navigation .item a {
  padding    : .6rem 1rem;
  font-size  : 1rem;
  font-weight: 500;
  display    : block;
  position: relative;
  color: #444;
  font-weight: 400;
}

@media (min-width: 1200px) and (max-width: 1500px) {
  .context-navigation .item a {
    font-size: .9rem;
  }
}

.context-navigation .item a:hover {
  background: #cc4400 !important;
  color     : white !important;
}

.context-navigation-header {
  color      : #333;
  font-size  : 16px;
  font-weight: 500;
  padding    : 1rem;
  box-shadow : 0px 4px 19px rgba(0, 0, 1, 0.07);
  border-bottom: 3px solid #cc4400;
}
.context-navigation-header a {
  color: #444;
    font-size: 1.3rem;
    font-weight: 100;
}

.context-navigation .active-indicator {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    color: #cc4400;
    font-weight: bold;
}

.context-navigation .item a:hover .active-indicator {
  color     : white !important;
}
`;
