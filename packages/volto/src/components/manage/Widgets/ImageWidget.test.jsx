import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import ImageWidget from './ImageWidget';

const mockStore = configureStore();

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: '/route',
    search: '',
    hash: '',
    state: null,
    key: '5nvxpbdafa',
    location: '/route',
  }),
}));

test('renders an image sizes widget component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const component = renderer.create(
    <Provider store={store}>
      <ImageWidget
        id="image"
        title="Image"
        fieldSet="default"
        onChange={() => {}}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
