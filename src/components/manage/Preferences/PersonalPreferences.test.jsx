import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import PersonalPreferences from './PersonalPreferences';

const mockStore = configureStore();

jest.mock('react-portal', () => ({
  Portal: jest.fn(() => <div id="Portal" />),
}));

describe('PersonalPreferences', () => {
  it('renders a personal preferences component', () => {
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
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <PersonalPreferences
            location={{ pathname: '/blog' }}
            closeMenu={() => {}}
          />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
