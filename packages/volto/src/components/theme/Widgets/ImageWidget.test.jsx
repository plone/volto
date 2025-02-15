import React from 'react';
import renderer from 'react-test-renderer';
import ImageWidget from './ImageWidget';

describe('ImageWidget', () => {
  it('renders an empty image view widget component', () => {
    const component = renderer.create(<ImageWidget />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an image view widget component', () => {
    const component = renderer.create(
      <ImageWidget className="metadata" value={{ download: '/foo-bar.png' }} />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an image view widget component with children', () => {
    const component = renderer.create(
      <ImageWidget
        className="metadata"
        value={{
          download: '/foo-bar.png',
          file_name: 'foo-bar.png',
        }}
      >
        {(child) => <strong>{child}</strong>}
      </ImageWidget>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
