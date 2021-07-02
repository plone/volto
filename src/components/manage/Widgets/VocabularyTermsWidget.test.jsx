import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import VocabularyTermsWidget from './VocabularyTermsWidget';

const mockStore = configureStore();

test('renders a dictionary widget component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <VocabularyTermsWidget
        id="test-dict"
        title="My Vocabulary"
        fieldSet="default"
        onChange={() => {}}
        onBlur={() => {}}
        onClick={() => {}}
        value={{
          manual: 'Manual',
          ubersicht: 'Übersicht',
        }}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
