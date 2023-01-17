import React from 'react';
import Wrapper from '@plone/volto/storybook';
import TextLineEdit from './TextLineEdit';
import { BlocksForm } from '@plone/volto/components';
import { RealStoreWrapper, FormUndoWrapper } from '@plone/volto/storybook';

function StoryComponent(args) {
  const {
    data = {},
    fieldName,
    fieldDataName,
    properties,
    renderClassName,
    renderTag,
    placeholder,
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
        fieldName={fieldName}
        fieldDataName={fieldDataName}
        placeholder={placeholder}
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

export const Description = StoryComponent.bind({});
Description.storyName = 'Use other metadata field';
Description.args = {
  renderTag: 'h2',
  fieldName: 'description',
};

export const ValueAsData = StoryComponent.bind({});
ValueAsData.args = {
  fieldDataName: 'title',
  renderClassName: '',
  renderTag: 'h1',
  properties: {
    title: 'This is properties title',
  },
};

export const InitialPropertiesValue = StoryComponent.bind({});
InitialPropertiesValue.storyName = 'Set an initial value';
InitialPropertiesValue.args = {
  renderClassName: '',
  renderTag: 'h2',
  properties: {
    title: 'Initial value',
  },
};

export const InitialValue = StoryComponent.bind({});
InitialValue.storyName = 'Set an initial value (as field data)';
InitialValue.args = {
  fieldDataName: 'title',
  renderClassName: '',
  renderTag: 'h2',
  data: {
    title: 'Initial value',
  },
};

export const CustomPlaceholder = StoryComponent.bind({});
CustomPlaceholder.args = {
  fieldDataName: 'title',
  renderClassName: '',
  renderTag: 'h2',
  placeholder: 'Custom placeholder',
};

export const CustomClassName = StoryComponent.bind({});
CustomClassName.storyName = 'Custom classname (as field data)';
CustomClassName.args = {
  fieldDataName: 'subtitle',
  renderClassName: 'documentFirstHeading',
  renderTag: 'h3',
};

export const H2 = StoryComponent.bind({});
H2.storyName = 'Tag as h2';
H2.args = {
  fieldDataName: 'title',
  renderClassName: '',
  renderTag: 'h2',
};

export const H3 = StoryComponent.bind({});
H3.storyName = 'Tag as h3';
H3.args = {
  fieldDataName: 'subtitle',
  renderClassName: '',
  renderTag: 'h3',
};

const TextlineBlockEdit = (props) => {
  const { data = {} } = props;
  return (
    <TextLineEdit
      {...props}
      fieldName={data.fieldName}
      fieldDataName={data.fieldDataName}
    />
  );
};

const blocksConfig = {
  testTextlineBlock: {
    id: 'testTextlineBlock',
    title: 'Textline Block',
    view: (props) => <TextLineEdit {...props} />,
    edit: TextlineBlockEdit,
    blockHasOwnFocusManagement: true,
  },
};

const content = {
  title: 'Some title here',
  description: 'Some description here',
  blocks: {
    a: { '@type': 'testTextlineBlock' },
    b: { '@type': 'testTextlineBlock', fieldName: 'description' },
    c: {
      '@type': 'testTextlineBlock',
      fieldDataName: 'fieldC',
      placeholder: 'Type something for fieldC',
    },
  },
  blocks_layout: { items: ['a', 'b', 'c'] },
};

export const AsBlockComponent = (props) => {
  const pathname = '/folder2/folder21/doc212';
  const [selectedBlock, setSelectedBlock] = React.useState();

  return (
    <RealStoreWrapper location={{ pathname }}>
      <FormUndoWrapper initialState={content} showControls={true}>
        {({ state, onChange }) => (
          <div style={{ width: '400px' }}>
            <BlocksForm
              pathname={pathname}
              blocksConfig={blocksConfig}
              metadata={state}
              properties={state}
              selectedBlock={selectedBlock}
              onSelectBlock={setSelectedBlock}
              onChangeField={(id, value) => onChange({ ...state, [id]: value })}
              onChangeFormData={onChange}
              isMainForm={false}
            >
              {({ draginfo }, editBlock, blockProps) => (
                <div
                  className="edit-block"
                  ref={draginfo.innerRef}
                  {...draginfo.draggableProps}
                >
                  <div className="draghandle" {...draginfo.dragHandleProps} />
                  {editBlock}
                </div>
              )}
            </BlocksForm>
            <pre>Value: {JSON.stringify(state, null, 4)}</pre>
          </div>
        )}
      </FormUndoWrapper>
    </RealStoreWrapper>
  );
};
AsBlockComponent.args = {};

export default {
  title: 'Internal components/TextLineEdit',
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
