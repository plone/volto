import React from 'react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { waitFor, render, screen } from '@testing-library/react';

import PersonalPreferences from './PersonalPreferences';

const mockStore = configureStore();

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));

jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);

describe('PersonalPreferences', () => {
  it('renders a personal preferences component', async () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      vocabularies: {
        'plone.app.vocabularies.Keywords': {
          items: [{ title: 'My item', value: 'myitem' }],
          itemsTotal: 1,
        },
      },
    });
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PersonalPreferences
            location={{ pathname: '/blog' }}
            closeMenu={() => {}}
          />
        </MemoryRouter>
      </Provider>,
    );
    await waitFor(() => {
      screen.getByTitle('Cancel');
    });
    expect(container).toMatchSnapshot();
  });
});
