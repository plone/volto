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

  it('validates blocks with a blockSchema on submit when there is no content', () => {
    // The content type layout editor renders the form without content
    const { initialBlocksFocus } = config.blocks;
    config.blocks.initialBlocksFocus = {};
    config.blocks.blocksConfig.blockWithSchema = {
      id: 'blockWithSchema',
      blockSchema: () => ({
        fieldsets: [{ id: 'default', title: 'Default', fields: ['url'] }],
        properties: { url: { title: 'URL' } },
        required: [],
      }),
    };
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
      content: {
        data: null,
        create: {
          loading: false,
          loaded: true,
        },
      },
    });
    const formData = {
      blocks: { a: { '@type': 'blockWithSchema', url: '/image' } },
      blocks_layout: { items: ['a'] },
    };
    const onSubmit = vi.fn();
    const ref = React.createRef();

    renderer.create(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/controlpanel/dexterity-types/book']}>
          <Form
            ref={ref}
            formData={formData}
            schema={{
              fieldsets: [
                {
                  id: 'default',
                  title: 'Default',
                  fields: ['blocks', 'blocks_layout'],
                },
              ],
              properties: {
                blocks: {},
                blocks_layout: {},
              },
              required: [],
            }}
            onSubmit={onSubmit}
            onCancel={() => {}}
          />
        </MemoryRouter>
      </Provider>,
    );

    try {
      expect(() => ref.current.onSubmit()).not.toThrow();
      expect(onSubmit).toHaveBeenCalledWith(formData);
    } finally {
      delete config.blocks.blocksConfig.blockWithSchema;
      config.blocks.initialBlocksFocus = initialBlocksFocus;
    }
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
