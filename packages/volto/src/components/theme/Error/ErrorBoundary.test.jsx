import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

const mockStore = configureStore();

describe('Error boundary', () => {
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

    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <ErrorBoundary name={'test'}>
            <ThrowError />
          </ErrorBoundary>
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
