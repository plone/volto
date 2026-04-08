import React from 'react';
import renderer from 'react-test-renderer';
import FileWidget from './FileWidget';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
  userSession: {
    token: '12345',
  },
});

describe('FileWidget', () => {
  it('renders an empty file view widget component', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <FileWidget />
        </Provider>
      </MemoryRouter>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a simple file view widget component', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <FileWidget className="metadata" value="/foo-bar.pdf" />
        </Provider>
      </MemoryRouter>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a file view widget component', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <FileWidget
            className="metadata"
            value={{ download: '/foo-bar.pdf' }}
          />
        </Provider>
      </MemoryRouter>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a file view widget component with children', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Provider store={store}>
          <FileWidget
            className="metadata"
            value={{
              download: '/foo-bar.pdf',
              filename: 'foo-bar.pdf',
              'content-type': 'application/x-pdf',
              size: 123456,
            }}
          >
            {(child) => <strong>{child}</strong>}
          </FileWidget>
        </Provider>
      </MemoryRouter>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
