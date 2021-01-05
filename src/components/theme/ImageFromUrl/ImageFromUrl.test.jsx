import React from 'react';
import renderer from 'react-test-renderer';

import ImageFromUrl from './ImageFromUrl';

describe('ImageFromUrl', () => {
  it('renders with default values', () => {
    const component = renderer.create(
      <ImageFromUrl url="http://localhost:8080/Plone/photo.png" />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders with props', () => {
    const component = renderer.create(
      <ImageFromUrl
        url="http://localhost:8080/Plone/photo.png"
        alt="Photo"
        className="photo-image"
        size="preview"
        role="presentation"
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
