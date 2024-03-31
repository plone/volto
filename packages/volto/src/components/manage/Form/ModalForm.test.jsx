import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { render } from '@testing-library/react';

import ModalForm from './ModalForm';

const mockStore = configureStore();

jest.mock('./Field', () => jest.fn(() => <div className="Field" />));

describe('ModalForm', () => {
  it('renders a modal form component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <ModalForm
          schema={{
            fieldsets: [
              {
                id: 'default',
                title: 'Default',
                fields: ['title'],
              },
            ],
            properties: {
              title: {},
            },
            required: [],
          }}
          onSubmit={() => {}}
          onCancel={() => {}}
          open={false}
          title="Rename items"
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a loading message', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {
          loadingMessage: {
            id: 'Rename items Loading Message',
            defaultMessage: 'Renaming items...',
          },
        },
      },
    });
    const jsx = (
      <Provider store={store}>
        <ModalForm
          loading={true}
          loadingMessage={'Renaming items...'}
          schema={{
            fieldsets: [
              {
                id: 'default',
                title: 'Default',
                fields: ['title'],
              },
            ],
            properties: {
              title: {},
            },
            required: [],
          }}
          onSubmit={() => {}}
          onCancel={() => {}}
          open={true}
          title="Rename items"
        />
      </Provider>
    );
    const { getByText } = render(jsx, {
      contaner: document.body,
    });

    const loadingMessage = getByText(/renaming items.../i);
    expect(loadingMessage).toBeInTheDocument();
  });
});
