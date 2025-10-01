import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import Form from './Form';

const mockStore = configureStore();
const errorMessage =
  "[{'message': 'The specified email is not valid.', 'field': 'contact_email', 'error': 'ValidationError'}";

vi.mock('@plone/volto/components/manage/Form', async () => {
  return await import(
    '@plone/volto/components/manage/Form/__mocks__/index.vitest.tsx'
  );
});

describe('Form', () => {
  it('renders a form component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      content: {
        data: {},
        create: {
          loading: false,
          loaded: true,
        },
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
