import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import TextWidget from './TextWidget';

const mockStore = configureStore();

test('renders a text widget component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const component = renderer.create(
    <Provider store={store}>
      <TextWidget
        id="my-field"
        title="My field"
        fieldSet="default"
        onChange={() => {}}
        onBlur={() => {}}
        onClick={() => {}}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('adds aria-required attribute to input when required prop is true', () => {
  const store = mockStore({
    intl: { locale: 'en', messages: {} },
  });

  render(
    <Provider store={store}>
      <TextWidget
        id="my-field"
        title="My field"
        onChange={() => {}}
        onBlur={() => {}}
        onClick={() => {}}
        required={true}
      />
    </Provider>,
  );

  expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
});

test('adds aria-invalid attribute to input when field has errors', () => {
  const store = mockStore({
    intl: { locale: 'en', messages: {} },
  });

  render(
    <Provider store={store}>
      <TextWidget
        id="my-field"
        title="My field"
        onChange={() => {}}
        onBlur={() => {}}
        onClick={() => {}}
        required={true}
        error={['This field is required']}
      />
    </Provider>,
  );

  expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
});
