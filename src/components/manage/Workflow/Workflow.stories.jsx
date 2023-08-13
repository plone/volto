import { injectIntl } from 'react-intl';
import React from 'react';
import WorkflowComponent from './Workflow';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlWorkflowComponent = injectIntl(WorkflowComponent);

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        workflow: {
          currentState: { ...args },
          history: [],
          transition: { loaded: true },
          transitions: [],
        },
        intl: {
          locale: 'en',
          messages: {},
        },
        content: { data: { ...args } },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlWorkflowComponent pathname="/test" />
    </Wrapper>
  );
}

export const Workflow = StoryComponent.bind({});
Workflow.args = {
  id: 'published',
  title: 'published',
  review_state: 'published',
};
export default {
  title: 'Public components/Workflow',
  component: Workflow,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    id: {
      options: ['private', 'published'],
      control: { type: 'radio' },
      description:
        'workflow id of the page for example purpose only private , published shown',
    },
    title: {
      options: ['private', 'published'],
      control: { type: 'radio' },
      description:
        'workflow of the page for example purpose only private , published shown',
    },
    review_state: {
      options: ['private', 'published'],
      control: { type: 'radio' },
      description:
        'review state of the page for example purpose only private , published shown',
    },
  },
};
