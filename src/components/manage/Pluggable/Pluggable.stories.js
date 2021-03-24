import {
  Pluggable,
  Plug,
  PluggablesProvider,
  createPluggableAndPlug,
} from './index';
import Wrapper from '@plone/volto/storybook';
import React from 'react';

const RandomBlock = (props) => {
  const { id = 'buttonA', marker } = props;
  return (
    <div>
      <Plug pluggable="toolbar" id={id}>
        <div>
          {id}
          {marker}
        </div>
      </Plug>
    </div>
  );
};

export const Simple = (args) => {
  return (
    <Wrapper>
      <PluggablesProvider>
        <div style={{ backgroundColor: 'pink', padding: '1em' }}>
          <Pluggable name="toolbar" />
        </div>

        <div style={{ backgroundColor: 'lightblue', padding: '1em' }}>
          <RandomBlock id="A" />
          <RandomBlock id="B" />
        </div>
      </PluggablesProvider>
      <blockquote>
        The A and B text are components inside the blue background, but they are
        rendered as part of the upper red component
      </blockquote>
    </Wrapper>
  );
};

Simple.parameters = {
  docs: {
    description: {
      component:
        "Pluggables are similar to React's Portal, but provide more control over how inserts are rendered",
    },
    source: {
      code: `
<PluggablesProvider>
  <Pluggable name="toolbar" />
  <Plug pluggable="toolbar">Something</Plug>
</PluggablesProvider>
      `,
    },
  },
};

export const Override = (args) => {
  return (
    <Wrapper>
      <PluggablesProvider>
        <div style={{ backgroundColor: 'pink', padding: '1em' }}>
          <Pluggable name="toolbar" />
        </div>

        <div style={{ backgroundColor: 'lightblue', padding: '1em' }}>
          <RandomBlock id="A" marker="-1" />
          <RandomBlock id="A" marker="-2" />
        </div>
      </PluggablesProvider>
      <blockquote>
        We have two plug components in the tree and the second one overrides the
        first because they use the same id (A).
      </blockquote>
    </Wrapper>
  );
};

Override.parameters = {
  docs: {
    description: {
      component:
        'By rendering a plug insert with the same id, only the last one will be rendered',
    },
    source: {
      code: `
<PluggablesProvider>
  <Pluggable name="toolbar" />
  <Plug id="a" pluggable="toolbar">From first</Plug>
  <Plug id="a" pluggable="toolbar">From second</Plug>
</PluggablesProvider>
      `,
    },
  },
};

const [Toolbar, ToolbarPlug] = createPluggableAndPlug('toolbar');
export const UsingCreatePluggableAndPlug = (args) => {
  return (
    <Wrapper>
      <PluggablesProvider>
        <div style={{ backgroundColor: 'pink', padding: '1em' }}>
          <Toolbar name="toolbar" />
        </div>

        <div style={{ backgroundColor: 'lightblue', padding: '1em' }}>
          <ToolbarPlug id="A">ABC</ToolbarPlug>
        </div>
      </PluggablesProvider>
    </Wrapper>
  );
};

UsingCreatePluggableAndPlug.parameters = {
  docs: {
    description: {
      component:
        'We can use `createPluggableAndPlug` to create a new pluggable + plug components pair. ',
    },
    source: {
      code: `
const [Toolbar, ToolbarPlug] = createPluggableAndPlug('toolbar');

<PluggablesProvider>
  <Toolbar />
  <ToolbarPlug id="a" >From first</ToolbarPlug>
  <ToolbarPlug id="b" >From second</ToolbarPlug>
</PluggablesProvider>
      `,
    },
  },
};

export default {
  title: 'Pluggable components',
  component: Pluggable,
};
