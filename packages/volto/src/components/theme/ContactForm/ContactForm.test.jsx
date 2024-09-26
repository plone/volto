import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import ContactForm from './ContactForm';

jest.mock('@plone/volto/components/manage/Toolbar');
jest.mock('@plone/volto/components/manage/Form');

const mockStore = configureStore();
describe('Contact form', () => {
  it('renders a contact form', () => {
    const store = mockStore({
      emailNotification: {
        error: {},
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
