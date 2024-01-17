import React from 'react';
import RelationWidget from './RelationWidget';
import Wrapper from '@plone/volto/storybook';

const RelationWidgetComponent = ({ children, className, value }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <RelationWidget
          value={value}
          children={children}
          className={className}
        />
      </div>
    </Wrapper>
  );
};

export const Relation = RelationWidgetComponent.bind({});
Relation.args = {
  value: {
    '@id': '/document',
    token: '/document',
    title: 'My Document',
    '@type': 'Document',
    is_folderish: true,
  },
  className: '',
};

const options = [
  {
    '@id': '/document',
    token: '/document',
    title: 'My Document',
    '@type': 'Document',
    is_folderish: true,
  },
  {
    '@id': '/event',
    token: '/event',
    title: 'My Event',
    '@type': 'Event',
    description: 'My Event description',
  },
  {
    '@id': '/news_item',
    token: '/news_item',
    title: 'My News item',
    '@type': 'News Item',
  },
  { '@id': '/default', token: '/default', title: 'Default icon' },
];
export default {
  title: 'View Widgets/Relation',
  component: RelationWidget,
  argTypes: {
    value: {
      options: Object.keys(options),
      mapping: options,
      control: {
        type: 'select',
        labels: {
          0: 'Document',
          1: 'Event',
          2: 'News item',
          3: 'Default',
        },
      },
    },
  },
};
