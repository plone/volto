import React from 'react';
import Wrapper from '@plone/volto/storybook';
import TextLineEdit from './TextLineEdit';

function StoryComponent(args) {
  const {
    data = {},
    fieldDataName,
    properties,
    renderClassName,
    renderTag,
    locale,
  } = args;

  const [dataState, setData] = React.useState(data);
  const [propertiesState, setProperties] = React.useState(properties);

  return (
    <Wrapper
      customStore={{ intl: { locale } }}
      location={{ pathname: '/folder2/folder21/doc212' }}
    >
      <TextLineEdit
        renderTag={renderTag}
        renderClassName={renderClassName}
        fieldDataName={fieldDataName}
        properties={properties}
        onChangeBlock={(block, value) => setData(value)}
        onChangeField={(field, value) =>
          setProperties({ ...propertiesState, [field]: value })
        }
        data={dataState}
      />
      {fieldDataName ? (
        <pre>Block data: {JSON.stringify(dataState, null, 4)}</pre>
      ) : (
        <pre>
          Properties/Metadata: {JSON.stringify(propertiesState, null, 4)}
        </pre>
      )}
    </Wrapper>
  );
}

export const Default = StoryComponent.bind({});
Default.args = {
  renderClassName: 'documentFirstHeading',
};

export const H2 = StoryComponent.bind({});
H2.args = {
  fieldDataName: 'title',
  renderClassName: '',
  renderTag: 'h2',
  fieldValue: 'The title',
};

export default {
  title: 'Edit Widgets/TextLineEdit',
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
