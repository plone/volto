import React from 'react';
import EmailWidget from './EmailWidget';
import Wrapper from '@plone/volto/storybook';

const EmailWidgetComponent = ({ children, className, value }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <EmailWidget value={value} children={children} className={className} />
      </div>
    </Wrapper>
  );
};

export const Email = EmailWidgetComponent.bind({});
Email.args = {
  value: 'volto@plone.org',
  className: '',
};

export default {
  title: 'View Widgets/Email',
  component: EmailWidget,
  argTypes: {},
};
