import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import { WysiwygWidget } from './WysiwygWidget';

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

const mockStore = configureStore();

jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);

test('renders a wysiwyg widget component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
    userSession: {
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU4MjM0MzcyNSwiZnVsbG5hbWUiOm51bGx9.BxCvhI8qrtSYUbuTCJCe5TYo1jw8LXZC3gwd726O0UI',
    },
  });

  const component = renderer.create(
    <Provider store={store}>
      <WysiwygWidget id="my-field" title="My field" onChange={() => {}} />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
