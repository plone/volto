import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import ContentsPropertiesModal from './ContentsPropertiesModal';

const mockStore = configureStore();

jest.mock('../Form/ModalForm', () => jest.fn(() => <div id="modalform" />));

describe('ContentsPropertiesModal', () => {
  it('renders a contents properties modal component', () => {
    const store = mockStore({
      content: {
        update: {
          loading: false,
          loaded: true,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <ContentsPropertiesModal
          open
          onOk={() => {}}
          onCancel={() => {}}
          items={['/blog']}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
