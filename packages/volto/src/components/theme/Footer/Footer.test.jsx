import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Footer from './Footer';

const mockStore = configureStore();

describe('Footer', () => {
  it('renders a footer component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </Provider>,
    );
    expect(container).toHaveTextContent('Plone');
  });
});
