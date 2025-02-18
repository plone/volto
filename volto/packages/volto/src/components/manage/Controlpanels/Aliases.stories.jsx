import { injectIntl } from 'react-intl';
import React from 'react';
import AliasesComponent from './Aliases';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlAliasesComponent = injectIntl(AliasesComponent);

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        aliases: {
          add: {
            loaded: false,
            loading: false,
            error: null,
          },
          remove: {
            loaded: false,
            loading: false,
            error: null,
          },
          get: {
            loading: false,
            loaded: true,
            error: null,
          },
          items: [
            {
              datetime: '2022-05-16T11:52:35+00:00',
              manual: true,
              path: '/eventsalias',
              'redirect-to': '/events',
            },
            {
              datetime: '2022-05-17T09:38:19+00:00',
              manual: true,
              path: '/eventsgreatalias',
              'redirect-to': '/events',
            },
            {
              datetime: '2022-05-17T09:38:35+00:00',
              manual: true,
              path: '/eventsincredible',
              'redirect-to': '/events',
            },
          ],
        },
        intl: {
          locale: 'en',
          messages: {},
        },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlAliasesComponent {...args} location={{ pathname: '/blog' }} />
    </Wrapper>
  );
}

export const Aliases = StoryComponent.bind({});

export default {
  title: 'Internal Components/ControlPanels/Aliases',
  component: Aliases,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '900px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
