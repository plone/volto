import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import SidebarPortal from './SidebarPortal';

test('sidebar portal is rendered when the block is selected', () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <SidebarPortal selected={true}>
      <p>Tested!</p>
    </SidebarPortal>,
  );
  const component = renderer.getRenderOutput();
  expect(component).toMatchSnapshot();
});

test('sidebar portal is not rendered when the block is not selected', () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <SidebarPortal selected={false}>
      <p>Tested, but you shouldn't see this in the snapshot!</p>
    </SidebarPortal>,
  );
  const component = renderer.getRenderOutput();
  expect(component).toMatchSnapshot();
});
