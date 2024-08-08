import React from 'react';
import TokenWidget from './TokenWidget';
import Wrapper from '@plone/volto/storybook';

const TokenWidgetComponent = ({ children, className, value }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <TokenWidget value={value} children={children} className={className} />
      </div>
    </Wrapper>
  );
};

export const Token = TokenWidgetComponent.bind({});
Token.args = {
  value: ['Token1', 'Token2', 'Token3'],
  className: '',
};

export default {
  title: 'View Widgets/Token',
  component: TokenWidget,
  argTypes: {},
};
