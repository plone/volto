import { injectIntl } from 'react-intl';
import React from 'react';
import SitemapComponent from './Sitemap';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlSitemapComponent = injectIntl(SitemapComponent);

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        navigation: {
          url: 'http://localhost:8080/Plone/@navigation',
          ...args,
        },
        intl: {
          locale: 'en',
          messages: {},
        },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlSitemapComponent />
    </Wrapper>
  );
}

export const Sitemap = StoryComponent.bind({});
Sitemap.args = {
  items: [
    {
      url: 'http://localhost:8080/Plone/page-1',
      description: '',
      items: [
        {
          url: 'http://localhost:8080/Plone/page-1/page-1-2',
          description: '',
          title: 'Page 1-2',
        },
        {
          url: 'http://localhost:8080/Plone/page-1/page-1-3',
          description: '',
          title: 'Page 1-3',
        },
      ],
      title: 'Page 1-3',
    },
    {
      url: 'http://localhost:8080/Plone/page-2',
      description: '',
      title: 'Page 2',
    },
  ],
};
export default {
  title: 'Public components/Sitemap',
  component: Sitemap,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '900px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    items: {
      control: 'object',
      description: 'url,description,title of the pages mentioned',
    },
  },
};
