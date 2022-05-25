import { injectIntl } from 'react-intl';
import React from 'react';
import { BreadcrumbsComponent } from './Breadcrumbs';
import Wrapper from '@plone/volto/storybook';

export const Breadcrumb = injectIntl(({ children, ...args }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <BreadcrumbsComponent
          pathname=""
          items={[
            {
              '@id': 'https://volto.kitconcept.com/api/Members',
              title: 'Users',
            },
          ]}
          getBreadcrumbs={() => {}}
          {...args}
        />
      </div>
    </Wrapper>
  );
});

export default {
  title: 'Public components/Breadcrumb',
  component: BreadcrumbsComponent,
  argTypes: {},
};
