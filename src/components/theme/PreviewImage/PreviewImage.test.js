import React from 'react';
import renderer from 'react-test-renderer';

import PreviewImage from './PreviewImage';

describe('PreviewImage', () => {
  it('renders a preview image', () => {
    const item = {
      image_field: 'image',
      title: 'Item title',
      '@id': 'http://localhost:3000/something',
    };
    const component = renderer.create(<PreviewImage item={item} />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a preview image with extra props', () => {
    const item = {
      image_field: 'image',
      title: 'Item title',
      '@id': 'http://localhost:3000/something',
    };
    const component = renderer.create(
      <PreviewImage item={item} className="extra" />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a preview image with custom size', () => {
    const item = {
      image_field: 'image',
      title: 'Item title',
      '@id': 'http://localhost:3000/something',
    };
    const component = renderer.create(
      <PreviewImage item={item} size="large" />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a fallback image', () => {
    const item = {
      title: 'Item title',
      '@id': 'http://localhost:3000/something',
    };
    const component = renderer.create(<PreviewImage item={item} />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a fallback image with extra props', () => {
    const item = {
      title: 'Item title',
      '@id': 'http://localhost:3000/something',
    };
    const component = renderer.create(
      <PreviewImage item={item} className="extra" />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a fallback image with alt prop empty', () => {
    const item = {
      title: 'Item title',
      '@id': 'http://localhost:3000/something',
    };
    const component = renderer.create(
      <PreviewImage item={item} className="extra" alt="" />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a fallback image with alt prop', () => {
    const item = {
      title: 'Item title',
      '@id': 'http://localhost:3000/something',
    };
    const component = renderer.create(
      <PreviewImage item={item} className="extra" alt="Alt prop" />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
