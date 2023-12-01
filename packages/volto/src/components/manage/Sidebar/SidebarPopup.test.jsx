import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import SidebarPopup from './SidebarPopup';

test('sidebar popup is rendered when the block is selected', () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <SidebarPopup open={true}>
      <p>Tested!</p>
    </SidebarPopup>,
  );
  const component = renderer.getRenderOutput();
  expect(component).toMatchSnapshot();
});

test('sidebar popup is not rendered when the block is not selected', () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <SidebarPopup open={false}>
      <p>Tested, but you shouldn't see this in the snapshot!</p>
    </SidebarPopup>,
  );
  const component = renderer.getRenderOutput();
  expect(component).toMatchSnapshot();
});
