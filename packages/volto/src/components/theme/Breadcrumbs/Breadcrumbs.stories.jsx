import { injectIntl } from 'react-intl';
import React from 'react';
import BreadcrumbsComponent from './Breadcrumbs';
import Wrapper from '@plone/volto/storybook';

export const Breadcrumb = injectIntl(({ children, ...args }) => {
  return (
    <Wrapper
      anonymous
      location={{ pathname: '/folder2/folder21/doc212' }}
      customStore={{
        breadcrumbs: {
          items: [
            { title: 'Blog', url: '/blog' },
            { title: 'My first blog', url: '/blog/my-first-blog' },
          ],
        },
      }}
    >
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <BreadcrumbsComponent pathname="" />
      </div>
    </Wrapper>
  );
});

export default {
  title: 'Public components/Breadcrumb',
  component: BreadcrumbsComponent,
  argTypes: {},
};
