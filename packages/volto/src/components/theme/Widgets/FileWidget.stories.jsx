import React from 'react';
import FileWidget from './FileWidget';
import Wrapper from '@plone/volto/storybook';

const FileWidgetComponent = ({ children, className, value }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <FileWidget value={value} children={children} className={className} />
      </div>
    </Wrapper>
  );
};

export const File = FileWidgetComponent.bind({});
File.args = {
  value: {
    download: 'download/filename.pdf',
    filename: 'filename.pdf',
    data: { length: 10 },
    size: 100,
    'content-type': 'application/pdf',
  },
  className: '',
};

export default {
  title: 'View Widgets/File',
  component: FileWidget,
  argTypes: {},
};
