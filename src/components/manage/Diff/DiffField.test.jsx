import React from 'react';
import renderer from 'react-test-renderer';

import DiffField from './DiffField';

jest.mock('moment', () =>
  jest.fn(() => ({
    format: jest.fn(() => 'Sunday, April 23, 2017 3:38 AM'),
  })),
);

describe('DiffField', () => {
  it('renders a diff field in split mode', () => {
    const component = renderer.create(
      <DiffField
        pathname="/blog"
        schema={{ title: 'Title', type: 'string' }}
        one="My old string"
        two="My new string"
        view="split"
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a diff field in unified mode', () => {
    const component = renderer.create(
      <DiffField
        pathname="/blog"
        schema={{ title: 'Title', type: 'string' }}
        one="My old string"
        two="My new string"
        view="unified"
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a richtext field', () => {
    const component = renderer.create(
      <DiffField
        pathname="/blog"
        schema={{ widget: 'richtext', title: 'Text', type: 'string' }}
        one={{ data: 'My old string' }}
        two={{ data: 'My new string' }}
        view="unified"
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a datetime field', () => {
    const component = renderer.create(
      <DiffField
        pathname="/blog"
        schema={{ widget: 'datetime', title: 'Text', type: 'string' }}
        one="2017-04-25T16:14:18+02:00"
        two="2016-04-25T16:14:18+02:00"
        view="unified"
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a textarea field', () => {
    const component = renderer.create(
      <DiffField
        pathname="/blog"
        schema={{ widget: 'textarea', title: 'Text', type: 'string' }}
        one="My old string"
        two="My new string"
        view="unified"
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a boolean field', () => {
    const component = renderer.create(
      <DiffField
        pathname="/blog"
        schema={{ title: 'Text', type: 'boolean' }}
        one
        two={false}
        view="unified"
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a boolean field with inverse values', () => {
    const component = renderer.create(
      <DiffField
        pathname="/blog"
        schema={{ title: 'Text', type: 'boolean' }}
        one={false}
        two
        view="unified"
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an array field', () => {
    const component = renderer.create(
      <DiffField
        pathname="/blog"
        schema={{ title: 'Text', type: 'array' }}
        one={['one', 'two']}
        two={['one', 'three']}
        view="unified"
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an array of objects field', () => {
    const component = renderer.create(
      <DiffField
        pathname="/blog"
        schema={{ title: 'Text', type: 'array' }}
        one={[
          { title: 'one', token: 'one' },
          { title: 'two', token: 'two' },
        ]}
        two={[
          { title: 'one', token: 'one' },
          { title: 'three', token: 'three' },
        ]}
        view="unified"
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
