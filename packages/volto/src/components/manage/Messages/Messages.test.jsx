import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Messages from './Messages';

const mockStore = configureStore();

describe('Messages', () => {
  it('renders an messages component', () => {
    const store = mockStore({
      messages: {
        messages: [
          {
            id: '1234',
            title: 'Title',
            body: 'Body',
            level: 'success',
          },
        ],
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Messages />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
