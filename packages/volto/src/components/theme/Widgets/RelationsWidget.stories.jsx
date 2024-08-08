import React from 'react';
import RelationsWidget from './RelationsWidget';
import Wrapper from '@plone/volto/storybook';

const RelationsWidgetComponent = ({ children, className, value }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <RelationsWidget
          value={value}
          children={children}
          className={className}
        />
      </div>
    </Wrapper>
  );
};

export const Relations = RelationsWidgetComponent.bind({});
Relations.args = {
  value: [
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
  ],
  className: '',
};

export default {
  title: 'View Widgets/Relations',
  component: RelationsWidget,
  argTypes: {},
};
