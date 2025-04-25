import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import UrlWidget from './UrlWidget';

const mockStore = configureStore();

test('renders an url widget component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const { container } = render(
    <Provider store={store}>
      <UrlWidget
        id="test-url"
        title="My Url"
        fieldSet="default"
        onChange={() => {}}
        onBlur={() => {}}
        onClick={() => {}}
      />
    </Provider>,
  );

  expect(container).toMatchSnapshot();
});
