import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import ContentsTagsModal from './ContentsTagsModal';

const mockStore = configureStore();

jest.mock('../Form/ModalForm', () => jest.fn(() => <div id="modalform" />));

describe('ContentsTagsModal', () => {
  it('renders a contents tags modal component', () => {
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
        <ContentsTagsModal
          open
          onOk={() => {}}
          onCancel={() => {}}
          items={[
            {
              subjects: [],
              url: '/blog',
            },
          ]}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
