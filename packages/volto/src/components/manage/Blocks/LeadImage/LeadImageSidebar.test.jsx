import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { BlockDataForm } from '@plone/volto/components/manage/Form';

import LeadImageSidebar from './LeadImageSidebar';

vi.mock('@plone/volto/components/manage/Form', () => ({
  BlockDataForm: vi.fn(() => <div className="block-data-form" />),
}));

const mockStore = configureStore();

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
  site: { data: { 'plone.image_scales': { preview: {}, listing: {} } } },
});

const properties = {
  '@id': 'http://localhost:3000/image.png',
  image: {
    download: 'http://localhost:3000/image.png/@@images/image-1200.png',
    width: 400,
    height: 400,
    scales: {
      preview: {
        download: 'http://localhost:3000/image.png/@@images/image-400.png',
        width: 400,
        height: 400,
      },
    },
  },
  image_caption: 'alternate text',
};

const renderSidebar = (props = {}) =>
  renderer.create(
    <Provider store={store}>
      <LeadImageSidebar
        data={{ '@type': 'leadimage' }}
        properties={properties}
        block="1234"
        pathname="/news"
        onChangeBlock={() => {}}
        openObjectBrowser={() => {}}
        onChangeField={() => {}}
        {...props}
      />
    </Provider>,
  );

beforeEach(() => {
  BlockDataForm.mockClear();
});

test('renders a Lead Image block Sidebar component', () => {
  const component = renderSidebar();

  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('renders the block schema plus the alt text content field', () => {
  renderSidebar();

  const { schema, formData } = BlockDataForm.mock.calls[0][0];
  expect(schema.fieldsets.map((fieldset) => fieldset.fields)).toEqual([
    ['image_caption', 'align'],
    ['href', 'openLinkInNewTab'],
  ]);
  expect(formData.image_caption).toBe('alternate text');
});

test('stores the alt text in the content and the rest in the block', () => {
  const onChangeBlock = vi.fn();
  const onChangeField = vi.fn();
  renderSidebar({
    data: { '@type': 'leadimage', align: 'left' },
    onChangeBlock,
    onChangeField,
  });

  const form = BlockDataForm.mock.calls[0][0];
  form.onChangeField('image_caption', 'new alt');
  expect(onChangeField).toHaveBeenCalledWith('image_caption', 'new alt');
  expect(onChangeBlock).not.toHaveBeenCalled();

  form.onChangeField('href', '/target');
  expect(onChangeBlock).toHaveBeenCalledWith('1234', {
    '@type': 'leadimage',
    align: 'left',
    href: '/target',
  });
});

test('keeps the alt text out of the block data', () => {
  const onChangeBlock = vi.fn();
  renderSidebar({ onChangeBlock });

  const form = BlockDataForm.mock.calls[0][0];
  form.onChangeBlock('1234', {
    '@type': 'leadimage',
    align: 'left',
    image_caption: 'alternate text',
  });
  expect(onChangeBlock).toHaveBeenCalledWith('1234', {
    '@type': 'leadimage',
    align: 'left',
  });
});

test('preserves an alt text stored in the block data by older blocks', () => {
  const onChangeBlock = vi.fn();
  renderSidebar({
    data: { '@type': 'leadimage', image_caption: 'legacy alt' },
    onChangeBlock,
  });

  const form = BlockDataForm.mock.calls[0][0];
  form.onChangeBlock('1234', {
    '@type': 'leadimage',
    align: 'left',
    image_caption: 'alternate text',
  });
  expect(onChangeBlock).toHaveBeenCalledWith('1234', {
    '@type': 'leadimage',
    align: 'left',
    image_caption: 'legacy alt',
  });
});

test('does not render the form without a lead image', () => {
  renderSidebar({ properties: {} });

  expect(BlockDataForm).not.toHaveBeenCalled();
});
