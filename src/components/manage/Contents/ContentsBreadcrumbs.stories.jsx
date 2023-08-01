import { injectIntl } from 'react-intl';
import React from 'react';
import ContentsBreadcrumbsComponent from './ContentsBreadcrumbs';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlContentBreadcrumbsComponent = injectIntl(
  ContentsBreadcrumbsComponent,
);
const breadcrumbs = [
  { title: 'Blog', url: '/blog' },
  { title: 'My first blog', url: '/blog/my-first-blog' },
];
function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        intl: {
          locale: 'en',
          messages: {},
        },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlContentBreadcrumbsComponent
        {...args}
        pathname="/blog"
        items={breadcrumbs}
      />
    </Wrapper>
  );
}

export const ContentBreadcrumbs = StoryComponent.bind({});

export default {
  title: 'Public components/Contents/Content Breadcrumbs',
  component: ContentBreadcrumbs,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
