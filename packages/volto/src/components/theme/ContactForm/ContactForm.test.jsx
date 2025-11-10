import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import ContactForm from './ContactForm';

vi.mock('../../manage/Toolbar/Toolbar', () => ({
  default: vi.fn(() => <div id="Portal" />),
}));

vi.mock('@plone/volto/components/manage/Form', async () => {
  return await import(
    '@plone/volto/components/manage/Form/__mocks__/index.vitest.tsx'
  );
});

const mockStore = configureStore();
describe('Contact form', () => {
  it('renders a contact form', () => {
    const store = mockStore({
      emailNotification: {
        error: null,
        loaded: false,
        loading: false,
      },
      intl: {
        locale: 'en',
        messages: {},
      },
      userSession: {},
      content: {},
    });
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ContactForm />
          <div id="toolbar"></div>
        </MemoryRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders a contact form with error message', () => {
    const store = mockStore({
      emailNotification: {
        error: {
          message: 'Error foo',
        },
        loaded: false,
        loading: false,
      },
      intl: {
        locale: 'en',
        messages: {},
      },
      userSession: {},
      content: {},
    });
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ContactForm />
          <div id="toolbar"></div>
        </MemoryRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
