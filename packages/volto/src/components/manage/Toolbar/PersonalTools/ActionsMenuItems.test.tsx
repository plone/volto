import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ActionsMenuItems, {
  isToolbarPanel,
  type PersonalToolsAction,
} from './ActionsMenuItems';

// The personal_tools category as plone.volto defines it, for a Manager.
const ploneVoltoActions: PersonalToolsAction[] = [
  {
    title: 'Profile',
    id: 'profile',
    icon: 'plone-user',
    url: '/personal-information',
  },
  {
    title: 'Preferences',
    id: 'preferences',
    icon: 'plone-user',
    url: 'preferences',
  },
  {
    title: 'Site Setup',
    id: 'plone_setup',
    icon: 'plone-controlpanel',
    url: '/controlpanel',
  },
];

const renderActionsMenuItems = (
  items: PersonalToolsAction[],
  loadComponent: (selector: string) => void = () => {},
) =>
  render(
    <MemoryRouter>
      <ul>
        <ActionsMenuItems actions={items} loadComponent={loadComponent} />
      </ul>
    </MemoryRouter>,
  );

const linkHrefs = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('a'), (link) =>
    link.getAttribute('href'),
  );

describe('ActionsMenuItems', () => {
  it('renders the personal tools actions', () => {
    const { asFragment } = renderActionsMenuItems(ploneVoltoActions);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders one entry per action, in order', () => {
    const { container } = renderActionsMenuItems(ploneVoltoActions);
    const entries = container.querySelectorAll('li');

    expect(Array.from(entries, (entry) => entry.textContent)).toEqual([
      'Profile',
      'Preferences',
      'Site Setup',
    ]);
  });

  it('renders root paths as links', () => {
    const { container } = renderActionsMenuItems(ploneVoltoActions);

    expect(linkHrefs(container)).toEqual([
      '/personal-information',
      '/controlpanel',
    ]);
  });

  it('opens the toolbar panel named by the action URL', () => {
    const loadComponent = vi.fn();
    renderActionsMenuItems(ploneVoltoActions, loadComponent);

    fireEvent.click(screen.getByRole('button', { name: 'Preferences' }));

    expect(loadComponent).toHaveBeenCalledTimes(1);
    expect(loadComponent).toHaveBeenCalledWith('preferences');
  });

  it('flattens absolute backend URLs to app paths', () => {
    const { container } = renderActionsMenuItems([
      {
        id: 'dashboard',
        title: 'Dashboard',
        url: 'http://localhost:8080/Plone/dashboard',
      },
    ]);

    expect(linkHrefs(container)).toEqual(['/dashboard']);
    expect(container.querySelector('button')).toBeNull();
  });

  it('renders no entries for an empty list', () => {
    const { container } = renderActionsMenuItems([]);

    expect(container.querySelectorAll('li')).toHaveLength(0);
  });
});

describe('isToolbarPanel', () => {
  it.each(['preferences', 'profile', 'my-panel', 'my_panel2'])(
    'treats %s as a toolbar panel',
    (url) => {
      expect(isToolbarPanel(url)).toBe(true);
    },
  );

  it.each([
    '',
    '/personal-information',
    '/controlpanel',
    'http://localhost:8080/Plone/dashboard',
    'mailto:admin@example.org',
    './preferences',
    'preferences?tab=1',
    '#preferences',
    '2fa',
  ])('treats %s as a link', (url) => {
    expect(isToolbarPanel(url)).toBe(false);
  });
});
