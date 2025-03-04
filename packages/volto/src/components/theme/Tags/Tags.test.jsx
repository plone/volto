import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import Tags from './Tags';

const mockStore = configureStore();

describe('Tags', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
  });

  it('renders without tags', () => {
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Tags content={{ subjects: [] }} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders with tags', () => {
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Tags content={{ subjects: ['Tag 1', 'Tag 2'] }} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
