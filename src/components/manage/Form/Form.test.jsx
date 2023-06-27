import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import Form from './Form';

const mockStore = configureStore();
const errorMessage =
  "[{'message': 'The specified email is not valid.', 'field': 'contact_email', 'error': 'ValidationError'}";

jest.mock('./Field', () => jest.fn(() => <div className="Field" />));

describe('Form', () => {
  it('renders a form component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const route = '/some-route';
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <Form
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
            requestError={errorMessage}
            onSubmit={() => {}}
            onCancel={() => {}}
          />
        </MemoryRouter>
        ,
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
