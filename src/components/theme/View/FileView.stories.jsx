import { injectIntl } from 'react-intl';
import React from 'react';
import FileViewComponent from './FileView';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlFileViewComponent = injectIntl(FileViewComponent);

function StoryComponent(args) {
  return (
    <Wrapper customStore={{}}>
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlFileViewComponent
        content={{
          ...args,
          file: {
            download: 'file:///preview.pdf',
            ...args,
          },
        }}
      />
    </Wrapper>
  );
}

export const Default = StoryComponent.bind({});
Default.args = {
  title: 'Hello World!',
  description: 'Hi',
  filename: 'preview.pdf',
};

export default {
  title: 'Public components/View/FileView',
  component: FileViewComponent,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '900px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: {
      description: 'Title of the component',
    },
    filename: {
      description: 'Name of the file',
    },
  },
};
