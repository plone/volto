import { render, waitFor, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter, Route } from 'react-router-dom';

import Controlpanel from './Controlpanel';

const mockStore = configureStore();

jest.mock('../Form/Form', () =>
  jest.fn(({ requestError }) => (
    <div id="form">
      {requestError ? `requestError : ${requestError}` : null}
    </div>
  )),
);
jest.mock('../Toolbar/Toolbar', () => jest.fn(() => <div id="Portal" />));

const store = mockStore({
  controlpanels: {
    controlpanel: {
      '@id': 'http://localhost:8080/Plone/@controlpanels/date-and-time',
      title: 'Date and Time',
      schema: {
        fieldsets: [],
        properties: [],
      },
      data: {},
    },
    update: {
      loading: false,
      loaded: true,
      error: { response: { body: { message: null } } },
    },
  },
  intl: {
    locale: 'en',
    messages: {},
  },
});

describe('Controlpanel', () => {
  it('renders a controlpanel component', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/controlpanel/date-and-time']}>
          <Route path={'/controlpanel/:id'} component={Controlpanel} />
          <div id="toolbar"></div>
        </MemoryRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
  it('renders a controlpanel component with error', async () => {
    const { container, rerender } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/controlpanel/date-and-time']}>
          <Route path={'/controlpanel/:id'} component={Controlpanel} />
          <div id="toolbar"></div>
        </MemoryRouter>
      </Provider>,
    );
    store.getState().controlpanels.update.loading = true;
    store.getState().controlpanels.update.error.response.body.message =
      "[{'message': 'Twitter username should not include the \"@\" prefix character.', 'field': 'twitter_username', 'error': 'ValidationError'}]";

    rerender(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/controlpanel/date-and-time']}>
          <Route path={'/controlpanel/:id'} component={Controlpanel} />
          <div id="toolbar"></div>
        </MemoryRouter>
      </Provider>,
    );
    await waitFor(() => screen.findByText(/Twitter/i));
    expect(container).toMatchSnapshot();
  });
});
