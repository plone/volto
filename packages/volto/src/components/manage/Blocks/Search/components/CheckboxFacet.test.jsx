import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import CheckboxFacet from './CheckboxFacet';

const mockStore = configureStore();

describe('CheckboxFacet', () => {
  it('renders a facet component with checkboxes', () => {
    const store = mockStore({
      userSession: { token: null },
      content: { data: { '@id': 'myid' } },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <CheckboxFacet
          choices={[
            { label: 'First', value: 'first' },
            { label: 'Second', value: 'second' },
          ]}
          facet={{ title: 'Test Facet', field: {} }}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
