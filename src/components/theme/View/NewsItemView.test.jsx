import config from '@plone/volto/registry';
import renderer from 'react-test-renderer';
import NewsItemView from './NewsItemView';

import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';

const { settings } = config;

const mockStore = configureStore();
const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

test('renders a news item view component', () => {
  const component = renderer.create(
    <Provider store={store}>
      <NewsItemView
        content={{
          title: 'Hello World!',
          description: 'Hi',
          text: {
            data: '<p>Hello World!',
          },
        }}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('renders a news item view component without links to api', () => {
  const component = renderer.create(
    <Provider store={store}>
      <NewsItemView
        content={{
          title: 'Hello World!',
          description: 'Hi',
          text: {
            data: `<p>Hello World!</p><p>This is an <a href="${settings.apiPath}/foo/bar">internal link</a> and a <a href="${settings.apiPath}/foo/baz">second link</a></p>`,
          },
        }}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
