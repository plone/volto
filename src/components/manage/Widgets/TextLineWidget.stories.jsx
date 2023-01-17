import React from 'react';
import TextLineWidget from './TextLineWidget';
import { InlineForm } from '@plone/volto/components';
import {
  RealStoreWrapper as Wrapper,
  FormUndoWrapper,
} from '@plone/volto/storybook';

import WidgetStory from './story';

const style = `
.blue {
  background-color: lightblue;
}`;

const props = {
  id: 'textline',
  title: 'Text line',
  value: 'Hello world',
  className: 'documentFirstHeading',
  focus: true,
};

export const Default = WidgetStory.bind({
  widget: TextLineWidget,
});
Default.storyName = 'Default';
Default.args = {
  ...props,
};

export const ConfigurableRenderTag = Default.bind({});
ConfigurableRenderTag.args = {
  ...props,
  as: 'pre',
  className: '',
};

export const ClickToFocus = Default.bind({});
ClickToFocus.args = {
  ...props,
  value: 'Hello world',
  focus: false,
};

export const ReadOnly = Default.bind({});
ReadOnly.args = {
  ...props,
  value: 'Hello world',
  readOnly: true,
};

export const WithCustomClassname = Default.bind({});
WithCustomClassname.args = {
  ...props,
  value: 'Hello world',
  className: 'blue',
};

const form = {
  value: {
    title: 'Title here',
    description: 'Description here',
    author: 'Author here',
  },
  schema: {
    title: 'Form navigation',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'description', 'author'],
      },
    ],
    properties: {
      title: {
        title: 'Title',
        widget: 'textline',
        as: 'h1',
      },
      description: {
        title: 'Description',
        widget: 'textline',
        as: 'pre',
      },
      author: {
        title: 'Description',
        widget: 'textline',
        as: 'strong',
      },
    },
    required: [],
  },
};

export const FormNavigation = (props) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <FormUndoWrapper initialState={form.value} showControls={true}>
        {({ state, onChange }) => (
          <div style={{ width: '400px' }}>
            <InlineForm
              schema={form.schema}
              block="block"
              formData={state}
              onChangeFormData={onChange}
              onChangeField={(id, value) => onChange({ ...state, [id]: value })}
            />
            <pre>Value: {JSON.stringify(state, null, 4)}</pre>
          </div>
        )}
      </FormUndoWrapper>
    </Wrapper>
  );
};

export default {
  title: 'Edit Widgets/TextLine',
  component: TextLineWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
