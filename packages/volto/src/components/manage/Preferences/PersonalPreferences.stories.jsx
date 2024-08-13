import { injectIntl } from 'react-intl';
import React from 'react';
import PersonalPreferencesComponent from './PersonalPreferences';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';
const IntlPersonalPreferencesComponent = injectIntl(
  PersonalPreferencesComponent,
);

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        intl: {
          locale: 'en',
          messages: {},
        },
        vocabularies: {
          'plone.app.vocabularies.Keywords': {
            items: [{ title: 'My item', value: 'myitem' }],
            itemsTotal: 1,
          },
        },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlPersonalPreferencesComponent
        {...args}
        location={{ pathname: '/blog' }}
        closeMenu={() => {}}
      />
    </Wrapper>
  );
}

export const PersonalPreferences = StoryComponent.bind({});

export default {
  title: 'Public components/PersonalPreferences',
  component: PersonalPreferences,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
