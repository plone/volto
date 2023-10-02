import renderer from 'react-test-renderer';
import View from './View';

import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();
const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

test('renders a view hero component', () => {
  const component = renderer.create(
    <Provider store={store}>
      <View data={{ url: 'heroimage.jpg' }} />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
