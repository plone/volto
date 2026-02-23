import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { render } from '@testing-library/react';

import ContentType from './ContentType';

const mockStore = configureStore();

vi.mock('@plone/volto/components/manage/Form');
vi.mock('../../Toolbar/Toolbar', () => ({
  default: vi.fn(() => <div id="Portal" />),
}));

describe('ContentType', () => {
  it('renders dexterity content-type component', () => {
    const store = mockStore({
      controlpanels: {
        controlpanel: {
          '@id':
            'http://localhost:8080/Plone/@controlpanels/dexterity-types/Document',
          title: 'Page',
          description: 'A document',
          data: {},
          schema: {},
        },
        update: {
          loaded: false,
          loading: false,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
      actions: {
        actions: {},
      },
      userSession: {
        token: null,
      },
      content: {
        data: {},
        get: {
          loading: false,
          loaded: true,
        },
      },
      types: {
        types: [],
        get: {
          loading: false,
          loaded: true,
        },
      },
    });
    store.dispatch = vi.fn(() => Promise.resolve());
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/controlpanel/dexterity-types/Document']}
        >
          <Route
            path={'/controlpanel/dexterity-types/:id'}
            component={ContentType}
          />
          <div id="toolbar"></div>
        </MemoryRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
