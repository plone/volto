import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Form from './Form';
import config from '~/config';

const mockStore = configureStore();

jest.mock('./Field', () => jest.fn(() => <div className="Field" />));

describe('Form', () => {
  // config.api = 'Plone';
  it('renders a form component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
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
          onSubmit={() => {}}
          onCancel={() => {}}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe('[guillotina] Form', () => {
  beforeEach(() => {
    config.api = 'guillotina';
  });
  it('asdasd renders a form component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <Form
          schema={{
            type_name: 'Document',
            fieldsets: [
              {
                fields: ['title', 'modification_date', 'creation_date', 'text'],
                id: 'default',
                title: 'Default',
              },
              {
                fields: [
                  'guillotina.behaviors.dublincore.IDublinCore|title',
                  'guillotina.behaviors.dublincore.IDublinCore|description',
                  'guillotina.behaviors.dublincore.IDublinCore|creation_date',
                  'guillotina.behaviors.dublincore.IDublinCore|modification_date',
                  'guillotina.behaviors.dublincore.IDublinCore|effective_date',
                  'guillotina.behaviors.dublincore.IDublinCore|expiration_date',
                  'guillotina.behaviors.dublincore.IDublinCore|creators',
                  'guillotina.behaviors.dublincore.IDublinCore|tags',
                  'guillotina.behaviors.dublincore.IDublinCore|publisher',
                  'guillotina.behaviors.dublincore.IDublinCore|contributors',
                ],
                id: 'guillotina.behaviors.dublincore.IDublinCore',
                title: 'Dublin Core fields',
              },
              {
                fields: [
                  'guillotina_cms.interfaces.base.ICMSBehavior|hidden_navigation',
                  'guillotina_cms.interfaces.base.ICMSBehavior|language',
                  'guillotina_cms.interfaces.base.ICMSBehavior|review_state',
                ],
                id: 'guillotina_cms.interfaces.base.ICMSBehavior',
                title: 'CMS data behavior',
              },
              {
                fields: [
                  'guillotina_cms.interfaces.tiles.ITiles|tiles_layout',
                  'guillotina_cms.interfaces.tiles.ITiles|tiles',
                ],
                id: 'guillotina_cms.interfaces.tiles.ITiles',
                title: 'Tiles behavior',
              },
            ],
            properties: {
              title: {},
            },
            definitions: {
              basic: {
                properties: {
                  title: {},
                },
              },
              'guillotina_cms.interfaces.tiles.ITiles': {
                properties: {
                  tiles: {},
                  tiles_layout: [],
                },
              },
            },
            required: [],
          }}
          onSubmit={() => {}}
          onCancel={() => {}}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
