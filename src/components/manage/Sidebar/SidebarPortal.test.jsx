import React from 'react';
import { shallow } from 'enzyme';

import SidebarPortal from './SidebarPortal';

test('sidebar portal is rendered when the tile is selected', () => {
  const component = shallow(
    <SidebarPortal selected={true}>
      <p>Tested!</p>
    </SidebarPortal>,
  );
  expect(component).toMatchSnapshot();
});

test('sidebar portal is not rendered when the tile is not selected', () => {
  const component = shallow(
    <SidebarPortal selected={false}>
      <p>Tested, but you shouldn't see this in the snapshot!</p>
    </SidebarPortal>,
  );
  expect(component).toMatchSnapshot();
});
