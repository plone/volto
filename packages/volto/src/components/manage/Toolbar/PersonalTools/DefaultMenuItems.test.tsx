import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import DefaultMenuItems from './DefaultMenuItems';

const mockStore = configureStore();

const siteSetup = { id: 'plone_setup', title: 'Site Setup', url: '' };

const renderDefaultMenuItems = (
  userActions?: { id: string; title: string; url: string }[],
  loadComponent: (selector: string) => void = () => {},
) => {
  const store = mockStore({
    ...(userActions !== undefined && {
      actions: { actions: { user: userActions } },
    }),
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ul>
          <DefaultMenuItems loadComponent={loadComponent} />
        </ul>
      </MemoryRouter>
    </Provider>,
  );
};

const linkHrefs = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('a'), (link) =>
    link.getAttribute('href'),
  );

describe('DefaultMenuItems', () => {
  it('renders the built-in entries', () => {
    const { asFragment } = renderDefaultMenuItems([siteSetup]);
    expect(asFragment()).toMatchSnapshot();
  });

  it('links to the personal information form', () => {
    const { container } = renderDefaultMenuItems();

    expect(linkHrefs(container)).toContain('/personal-information');
  });

  it('opens the preferences panel', () => {
    const loadComponent = vi.fn();
    renderDefaultMenuItems(undefined, loadComponent);

    fireEvent.click(screen.getByRole('button', { name: 'Preferences' }));

    expect(loadComponent).toHaveBeenCalledTimes(1);
    expect(loadComponent).toHaveBeenCalledWith('preferences');
  });

  it('links to Site Setup when the user has the plone_setup action', () => {
    const { container } = renderDefaultMenuItems([siteSetup]);

    expect(linkHrefs(container)).toEqual([
      '/personal-information',
      '/controlpanel',
    ]);
  });

  it('hides Site Setup when the user lacks the plone_setup action', () => {
    const { container } = renderDefaultMenuItems([
      { id: 'logout', title: 'Log out', url: '' },
    ]);

    expect(linkHrefs(container)).toEqual(['/personal-information']);
  });

  it('hides Site Setup when there are no actions', () => {
    const { container } = renderDefaultMenuItems();

    expect(linkHrefs(container)).toEqual(['/personal-information']);
    expect(container.querySelectorAll('li')).toHaveLength(2);
  });
});
