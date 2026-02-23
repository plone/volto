import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';

import SidebarPortal from './SidebarPortal';

describe('SidebarPortal', () => {
  let portalRoot: HTMLDivElement | null;

  beforeEach(() => {
    portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'sidebar-properties');
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    cleanup();
    portalRoot?.remove();
    portalRoot = null;
  });

  test('renders the sidebar portal when the block is selected', async () => {
    render(
      <SidebarPortal selected={true}>
        <p>Tested!</p>
      </SidebarPortal>,
    );

    expect(await screen.findByText('Tested!')).toBeInTheDocument();
  });

  test('does not render the sidebar portal when the block is not selected', () => {
    render(
      <SidebarPortal selected={false}>
        <p>Tested, but you should not see this!</p>
      </SidebarPortal>,
    );

    expect(
      screen.queryByText('Tested, but you should not see this!'),
    ).not.toBeInTheDocument();
  });
});
