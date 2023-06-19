import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import SearchTags from './SearchTags';

const mockStore = configureStore();

describe('SearchTags', () => {
  it('renders a search tags component', () => {
    const store = mockStore({
      vocabularies: {
        'plone.app.vocabularies.Keywords': {
          items: [{ label: 'Tag 1' }, { label: 'Tag 2' }],
        },
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <SearchTags />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
