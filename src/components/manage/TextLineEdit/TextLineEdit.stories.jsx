import React from 'react';
import Wrapper from '@plone/volto/storybook';
import TextLineEdit from './TextLineEdit';

function StoryComponent(args) {
  const {
    data = {},
    fieldDataName,
    placeholder,
    renderClassName,
    renderTag,
    locale,
  } = args;
  return (
    <Wrapper
      customStore={{ intl: { locale } }}
      location={{ pathname: '/folder2/folder21/doc212' }}
    >
      <TextLineEdit
        renderTag={renderTag}
        renderClassName={renderClassName}
        fieldDataName={fieldDataName}
        properties={{ title: 'The title' }}
        placeholder={placeholder}
        data={data}
      />
      <pre>Value: {JSON.stringify(data, null, 4)}</pre>
    </Wrapper>
  );
}

export const Default = StoryComponent.bind({});
Default.args = {
  fieldDataName: 'title',
  renderClassName: '',
  renderTag: 'h2',
  placeholder: 'Subtitle...',
};

export default {
  title: 'Internal Components/TextLineEdit',
  component: TextLineEdit,
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
