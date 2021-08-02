import React from 'react';
import {
  PluggablesProvider,
  Pluggable,
  Plug,
} from '@plone/volto/components/manage/Pluggable';

const Button = (props) => {
  const { id = 'buttonA', marker } = props;
  return (
    <div>
      <Plug pluggable="toolbar" id={id}>
        <div
          style={{
            backgroundColor: '#333',
            color: 'white',
            marginRight: '0.6em',
            padding: '0.3em',
          }}
        >
          {id}
          {marker}
        </div>
      </Plug>
    </div>
  );
};

const Toolbar = ({ blockId }) => {
  return (
    <Pluggable name="toolbar">
      {(pluggables) => {
        const disable = !!pluggables?.find(
          (plug) =>
            plug.id === 'disable-toolbar' && plug.extra.blockId !== blockId,
        );
        return disable ? (
          ''
        ) : (
          <div
            style={{
              backgroundColor: 'pink',
              padding: '1em',
              display: 'flex',
              marginBottom: '1em',
            }}
          >
            {pluggables.map((p) => p())}
          </div>
        );
      }}
    </Pluggable>
  );
};

const Block = ({ title, level, children, id }) => {
  return (
    <div style={{ border: '1px solid black', padding: '1em' }}>
      <Plug id="disable-toolbar" pluggable="toolbar" extra={{ blockId: id }}>
        <></>
      </Plug>
      <Toolbar blockId={id} />

      <Button id="UNIQUE" marker={level} />
      <Button id={`A${level}`} marker={level} />
      <Button id={`B${level}`} marker={level} />

      <h5>{title}</h5>
      {children}
    </div>
  );
};

const Demo = (props) => {
  return (
    <Block title="outer" level={0} id="a">
      <Block title="inner" level={1} id="b" />
    </Block>
  );
};

export const Default = Demo.bind({});

export default {
  title: 'Quanta/ToolbarPrinciple',
  component: Demo,
  decorators: [
    (Story) => (
      <PluggablesProvider>
        <div style={{ width: '400px', padding: '100px' }}>
          <Story />
        </div>
      </PluggablesProvider>
    ),
  ],
  argTypes: {},
};
