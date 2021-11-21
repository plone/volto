import React from 'react';
import { Anontools as AnontoolsDefault } from './Anontools';
import Wrapper from '@plone/volto/storybook';

const AnontoolsComponent = ({ children, ...args }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <AnontoolsDefault
          userSession={{ token: null }}
          content={{ '@id': 'myid' }}
        />
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
