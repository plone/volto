import React from 'react';
import renderer from 'react-test-renderer';
import FileWidget from './FileWidget';

describe('FileWidget', () => {
  it('renders an empty file view widget component', () => {
    const component = renderer.create(<FileWidget />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a simple file view widget component', () => {
    const component = renderer.create(
      <FileWidget className="metadata" value="/foo-bar.pdf" />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a file view widget component', () => {
    const component = renderer.create(
      <FileWidget className="metadata" value={{ download: '/foo-bar.pdf' }} />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a file view widget component with children', () => {
    const component = renderer.create(
      <FileWidget
        className="metadata"
        value={{
          download: '/foo-bar.pdf',
          filename: 'foo-bar.pdf',
          'content-type': 'application/x-pdf',
          size: 123456,
        }}
      >
        {(child) => <strong>{child}</strong>}
      </FileWidget>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
