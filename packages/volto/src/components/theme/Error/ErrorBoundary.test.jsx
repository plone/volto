import React from 'react';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

const mockStore = configureStore();

describe('Error boundary', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders an Error', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const ThrowError = () => {
      throw new Error('Test');
    };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ErrorBoundary name={'test'}>
            <ThrowError />
          </ErrorBoundary>
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText('<error: test>')).toBeInTheDocument();
  });
});
