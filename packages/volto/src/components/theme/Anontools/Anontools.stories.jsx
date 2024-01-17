import React from 'react';
import AnontoolsDefault from './Anontools';
import Wrapper from '@plone/volto/storybook';

const AnontoolsComponent = ({ children, ...args }) => {
  return (
    <Wrapper
      anonymous
      location={{ pathname: '/folder2/folder21/doc212' }}
      customStore={{
        content: {
          data: { '@id': 'http://myreturnURL' },
          get: {
            loaded: false,
            loading: false,
            error: null,
          },
        },
      }}
    >
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <AnontoolsDefault />
      </div>
    </Wrapper>
  );
};

export const Anontools = AnontoolsComponent.bind({});

export default {
  title: 'Public components/Anontools',
  component: AnontoolsDefault,
  argTypes: {},
};
