import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { render } from '@testing-library/react';

import CheckboxWidget from './CheckboxWidget';

const mockStore = configureStore();

describe('CheckboxWidget', () => {
  test('renders a checkbox widget component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const { asFragment } = render(
      <Provider store={store}>
        <CheckboxWidget
          id="checkbox-widget"
          title="Checkbox Widget"
          onChange={() => {}}
        />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders a checkbox widget component checked', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const { asFragment } = render(
      <Provider store={store}>
        <CheckboxWidget
          value={true}
          id="checked-checkbox-widget"
          title="Checked Checkbox Widget"
          onChange={() => {}}
        />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
