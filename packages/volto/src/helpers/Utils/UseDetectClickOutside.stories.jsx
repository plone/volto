import React from 'react';
import { useDetectClickOutside } from './useDetectClickOutside';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import { BlockChooser } from '@plone/volto/components';

function OpenedChooser(props) {
  const blockChooserRef = useDetectClickOutside({
    onTriggered: () => props.setOpenMenu(false),
    triggerKeys: ['Escape'],
  });

  return (
    <div ref={blockChooserRef} style={{ marginLeft: '20px' }}>
      Hello
    </div>
  );
}

function TestComponent(props) {
  const [isOpenMenu, setOpenMenu] = React.useState(false);

  return (
    <div style={{ display: 'flex', marginBottom: '20px' }}>
      <button onClick={() => setOpenMenu(true)}>Click me</button>
      {isOpenMenu && <OpenedChooser setOpenMenu={setOpenMenu} />}
    </div>
  );
}

function StoryComponent(args) {
  return (
    <>
      <TestComponent />
      <TestComponent />
      <TestComponent />
    </>
  );
}

function OpenedChooserWithPortal(props) {
  const blockChooserRef = useDetectClickOutside({
    onTriggered: () => props.setOpenMenu(false),
    triggerKeys: ['Escape'],
  });

  return createPortal(
    <div ref={blockChooserRef}>{`Hello ${props.id}`}</div>,
    document.getElementById('body'),
  );
}

function TestComponentWithPortal(props) {
  const [isOpenMenu, setOpenMenu] = React.useState(false);

  return (
    <div style={{ display: 'flex', marginBottom: '20px' }}>
      <button
        onClick={() => setOpenMenu(true)}
      >{`Click me ${props.id}`}</button>
      {isOpenMenu && (
        <OpenedChooserWithPortal {...props} setOpenMenu={setOpenMenu} />
      )}
    </div>
  );
}

function StoryComponentWithPortal(args) {
  return (
    <>
      <TestComponentWithPortal id={1} />
      <TestComponentWithPortal id={2} />
      <TestComponentWithPortal id={3} />
    </>
  );
}

function OpenedChooserWithPortalAndPopper(props) {
  const { showBlockChooser } = props;

  const blockChooserRef = useDetectClickOutside({
    onTriggered: () => props.setOpenMenu(false),
    triggerKeys: ['Escape'],
  });

  return showBlockChooser ? (
    <BlockChooser
      // onMutateBlock={onMutateBlock}
      // currentBlock={block}
      showRestricted
      // blocksConfig={blocksConfig}
      ref={blockChooserRef}
    />
  ) : (
    <div ref={blockChooserRef}>{`Hello ${props.id}`}</div>
  );
}

function TestComponentWithPortalAndPopper(props) {
  const [isOpenMenu, setOpenMenu] = React.useState(false);
  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'right',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [-10, 10],
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top-start'],
        },
      },
    ],
  });
  return (
    <div style={{ display: 'flex', marginBottom: '20px' }}>
      <button
        ref={setReferenceElement}
        onClick={() => setOpenMenu(true)}
      >{`Click me ${props.id}`}</button>
      {createPortal(
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {isOpenMenu && (
            <OpenedChooserWithPortalAndPopper
              {...props}
              setOpenMenu={setOpenMenu}
            />
          )}
        </div>,
        document.body,
      )}
    </div>
  );
}

function StoryComponentWithPortalAndPopper(args) {
  const { showBlockChooser } = args;
  return (
    <>
      <TestComponentWithPortalAndPopper
        id={1}
        showBlockChooser={showBlockChooser}
      />
      <TestComponentWithPortalAndPopper
        id={2}
        showBlockChooser={showBlockChooser}
      />
      <TestComponentWithPortalAndPopper
        id={3}
        showBlockChooser={showBlockChooser}
      />
    </>
  );
}

export const Default = StoryComponent.bind({});
Default.args = {};

export const WithPortal = StoryComponentWithPortal.bind({});
WithPortal.args = {};

export const WithPortalAndPopper = StoryComponentWithPortalAndPopper.bind({});
WithPortalAndPopper.args = {};

export const WithPortalAndPopperUsingBlockChooser =
  StoryComponentWithPortalAndPopper.bind({});
WithPortalAndPopperUsingBlockChooser.args = {
  showBlockChooser: true,
};

export default {
  title: 'Internal Components/useDetectClickOutside',
  component: TestComponent,
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
};
