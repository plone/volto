import React from 'react';
import SidebarPopup from './SidebarPopup';
import Wrapper from '@plone/volto/storybook';

const SidebarComponent = ({ children, ...args }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <p>
          Render a right-side sidebar. Mainly used to edit block settings and
          documents metadata (in the case of composite pages, with blocks). Use
          the controls to toggle the open state.
        </p>
        <SidebarPopup {...args}>
          <div style={{ padding: '1em' }}>
            <h1>What Is Volto</h1>
            <p>
              Volto is a React-based frontend for content management systems,
              currently supporting three backend implementations: Plone,
              Guillotina and a NodeJS reference implementation.
            </p>
            <p>
              Plone is a powerful, flexible Content Management Solution that is
              easy to install, use and extend..
            </p>
          </div>
        </SidebarPopup>
      </div>
    </Wrapper>
  );
};

export const Sidebar = SidebarComponent.bind({});
Sidebar.args = {
  open: true,
};

export default {
  title: 'Internal Components/Sidebar',
  component: SidebarPopup,
  argTypes: {},
};
