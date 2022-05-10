import React from 'react';
import PasswordWidget from './PasswordWidget';
import Wrapper from '@plone/volto/storybook';

const PasswordWidgetComponent = ({ children, className, value }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <PasswordWidget
          value={value}
          children={children}
          className={className}
        />
      </div>
    </Wrapper>
  );
};

export const Password = PasswordWidgetComponent.bind({});
Password.args = {
  value: 'mySecretPassword123!',
  className: '',
};

export default {
  title: 'View Widgets/Password',
  component: PasswordWidget,
  argTypes: {},
};
