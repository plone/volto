import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import SearchTags from './SearchTags';

const mockStore = configureStore();

describe('SearchTags', () => {
  it('renders a search tags component', () => {
    const store = mockStore({
      vocabularies: {
        'plone.app.vocabularies.Keywords': {
          terms: [{ title: 'Tag 1' }, { title: 'Tag 2' }],
        },
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <SearchTags />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
