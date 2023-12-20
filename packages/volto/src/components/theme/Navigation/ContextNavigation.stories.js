import { ContextNavigationComponent as CNC } from './ContextNavigation'; // ContextNavigationDefault,
import Wrapper from '@plone/volto/storybook';
import React from 'react';

const navigation = {
  '@id': 'http://localhost:3000/api/folder2/folder21/doc212/@contextnavigation',
  available: true,
  has_custom_name: false,
  items: [
    {
      '@id': 'http://localhost:3000/api/folder1',
      description: '',
      href: 'http://localhost:3000/api/folder1',
      icon: '',
      is_current: false,
      is_folderish: true,
      is_in_path: false,
      items: [],
      normalized_id: 'folder1',
      review_state: 'private',
      thumb: '',
      title: 'Folder1',
      type: 'folder',
    },
    {
      '@id': 'http://localhost:3000/api/folder2/folder21',
      description: '',
      href: 'http://localhost:3000/api/folder2/folder21',
      icon: '',
      is_current: false,
      is_folderish: true,
      is_in_path: true,
      items: [
        {
          '@id': 'http://localhost:3000/api/folder2/folder21/doc211',
          description: '',
          href: 'http://localhost:3000/api/folder2/folder21/doc211',
          icon: '',
          is_current: false,
          is_folderish: false,
          is_in_path: false,
          items: [],
          normalized_id: 'doc211',
          review_state: 'private',
          thumb: '',
          title: 'Doc211',
          type: 'document',
        },
        {
          '@id': 'http://localhost:3000/api/folder2/folder21/doc211-copy',
          description: '',
          href: 'http://localhost:3000/api/folder2/folder21/doc211-copy',
          icon: '',
          is_current: true,
          is_folderish: false,
          is_in_path: false,
          items: [],
          normalized_id: 'doc212',
          review_state: 'private',
          thumb: '',
          title: 'Doc212',
          type: 'document',
        },
      ],
      normalized_id: 'folder21',
      review_state: 'private',
      thumb: '',
      title: 'Folder21',
      type: 'folder',
    },
  ],
  title: 'NavTree',
  url: 'http://localhost:3000/api/folder2/sitemap',
};

// const customStore = {
//   contextNavigation: {
//     '/folder2/folder21/doc212/@contextnavigation': {
//       data: navigation,
//     },
//   },
//   userSession: { token: '1234' },
//   intl: {
//     locale: 'en',
//     messages: {},
//   },
// };

const ContextNavigationComponent = (args) => {
  return (
    <Wrapper>
      <style dangerouslySetInnerHTML={{ __html: style }}></style>
      <CNC {...args} navigation={navigation} />
    </Wrapper>
  );
};

// const ContextNavigationStory = (args) => {
//   return (
//     <Wrapper
//       location={{ pathname: '/folder2/folder21/doc212' }}
//       customStore={customStore}
//     >
//       <style dangerouslySetInnerHTML={{ __html: style }}></style>
//       <ContextNavigationDefault />
//     </Wrapper>
//   );
// };

export default {
  title: 'Public components/Context Navigation',
  component: CNC,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
  // subcomponents: { ArgsTable },
};

export const ContextNavigation = () => (
  <ContextNavigationComponent navigation={navigation} />
);

// export const Connected = () => <ContextNavigation />;

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
