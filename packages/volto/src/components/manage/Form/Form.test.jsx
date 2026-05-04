import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import Form from './Form';
import config from '@plone/volto/registry';

const mockStore = configureStore();
const errorMessage =
  "[{'message': 'The specified email is not valid.', 'field': 'contact_email', 'error': 'ValidationError'}";

vi.mock('@plone/volto/components/manage/Form');
vi.mock('@plone/volto/helpers/Utils/withSaveAsDraft', async () => {
  const React = await import('react');
  const { default: config } = await import('@plone/volto/registry');

  return {
    default: () => (WrappedComponent) =>
      React.forwardRef((props, ref) =>
        config.experimental?.saveAsDraft?.enabled ? (
          <div data-autosave-wrapper="true">
            <WrappedComponent
              {...props}
              checkSavedDraft={vi.fn()}
              onSaveDraft={vi.fn()}
              onCancelDraft={vi.fn()}
              ref={ref}
            />
          </div>
        ) : (
          <WrappedComponent {...props} ref={ref} />
        ),
      ),
  };
});

describe('Form', () => {
  beforeEach(() => {
    config.experimental = {
      ...(config.experimental || {}),
      saveAsDraft: {
        enabled: false,
      },
    };
  });

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
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('does not wrap the form with autosave when the experimental flag is disabled', () => {
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

    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/some-route']}>
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
      </Provider>,
    );

    expect(
      component.root.findAllByProps({ 'data-autosave-wrapper': 'true' }),
    ).toHaveLength(0);
  });

  it('wraps the form with autosave when the experimental flag is enabled', () => {
    config.experimental = {
      ...config.experimental,
      saveAsDraft: {
        enabled: true,
      },
    };

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

    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/some-route']}>
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
      </Provider>,
    );

    expect(
      component.root.findAllByProps({ 'data-autosave-wrapper': 'true' }),
    ).toHaveLength(1);
  });
});
