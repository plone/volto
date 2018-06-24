import React from 'react';
import renderer from 'react-test-renderer';
import Field from './Field';

jest.mock('../Widgets/ArrayWidget', () =>
  jest.fn(() => <div className="ArrayWidget" />),
);
jest.mock('../Widgets/CheckboxWidget', () =>
  jest.fn(() => <div className="CheckboxWidget" />),
);
jest.mock('../Widgets/PasswordWidget', () =>
  jest.fn(() => <div className="PasswordWidget" />),
);
jest.mock('../Widgets/SelectWidget', () =>
  jest.fn(() => <div className="SelectWidget" />),
);
jest.mock('../Widgets/TextWidget', () =>
  jest.fn(() => <div className="TextWidget" />),
);
jest.mock('../Widgets/TextareaWidget', () =>
  jest.fn(() => <div className="TextareaWidget" />),
);
jest.mock('../Widgets/DatetimeWidget', () =>
  jest.fn(() => <div className="DatetimeWidget" />),
);
jest.mock('../Widgets/WysiwygWidget', () =>
  jest.fn(() => <div className="WysiwygWidget" />),
);

describe('Field', () => {
  it('renders a `richtext` named field', () => {
    const component = renderer.create(<Field widget="richtext" id="test" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a `textarea` named field', () => {
    const component = renderer.create(<Field widget="textarea" id="test" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a `datetime` named field', () => {
    const component = renderer.create(<Field widget="datetime" id="test" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a `password` named field', () => {
    const component = renderer.create(<Field widget="password" id="test" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a `text` named field', () => {
    const component = renderer.create(<Field widget="text" id="test" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a select widget for a vocabulary-based field', () => {
    const component = renderer.create(
      <Field vocabulary="plone.app.vocabularies.Keywords" id="test" />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a select widget for a choices-based field', () => {
    const component = renderer.create(<Field choices={[]} id="test" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a `boolean` type field', () => {
    const component = renderer.create(<Field type="boolean" id="test" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders an `array` type field', () => {
    const component = renderer.create(<Field type="array" id="test" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders a fallback field', () => {
    const component = renderer.create(<Field id="test" />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
