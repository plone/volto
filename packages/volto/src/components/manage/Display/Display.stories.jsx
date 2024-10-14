import { injectIntl } from 'react-intl';
import React from 'react';
import DisplayComponent from './Display';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlDisplayComponent = injectIntl(DisplayComponent);

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        content: {
          update: { loaded: true },
          data: { layout: 'summary_view', '@type': 'Folder' },
        },
        schema: {
          schema: {
            layouts: ['summary_view', 'listing_view'],
          },
        },
        intl: {
          locale: 'en',
          messages: {},
        },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlDisplayComponent {...args} pathname="/test" />
    </Wrapper>
  );
}

export const Display = StoryComponent.bind({});

export default {
  title: 'Public components/Display',
  component: Display,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
