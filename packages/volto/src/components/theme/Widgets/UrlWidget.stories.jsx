import React from 'react';
import UrlWidget from './UrlWidget';
import Wrapper from '@plone/volto/storybook';

const UrlWidgetComponent = ({ children, className, value }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <UrlWidget value={value} children={children} className={className} />
      </div>
    </Wrapper>
  );
};

export const Url = UrlWidgetComponent.bind({});
Url.args = {
  value: 'https://docs.plone.org',
  className: '',
};

export default {
  title: 'View Widgets/Url',
  component: UrlWidget,
  argTypes: {},
};
