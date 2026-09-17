import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import type { JSONSchema, JSONSchemaFieldsets } from '@plone/types';
import config from '@plone/volto/registry';
import FieldsetView from './FieldsetView';

const ValueWidget = ({ value }: { value: unknown }) => (
  <span className="value">{String(value)}</span>
);

const schema: JSONSchema = {
  title: 'Test schema',
  fieldsets: [],
  properties: {
    title: { title: 'Title', type: 'string' },
    author: { title: 'Author', type: 'string' },
    count: { title: 'Count', type: 'number' },
  },
  required: [],
};

const data = { title: 'Hello World!', author: 'Érico', count: 3 };

const fieldset = (
  id: string,
  fields: string[] | undefined,
): JSONSchemaFieldsets =>
  ({ id, title: `The ${id} fieldset`, fields }) as JSONSchemaFieldsets;

let originalViews: typeof config.widgets.views;

beforeEach(() => {
  originalViews = config.widgets.views;
  config.widgets.views = {
    ...(config.widgets.views ?? {}),
    getWidget: () => ValueWidget,
  } as unknown as typeof config.widgets.views;
});

afterEach(() => {
  config.widgets.views = originalViews;
});

/** The field ids, in the order they were rendered. */
const renderedFieldIds = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('.ui.label')).map((label) =>
    label.getAttribute('title'),
  );

describe('FieldsetView', () => {
  it('heads a named fieldset with its title', () => {
    const { container } = render(
      <FieldsetView
        fieldset={fieldset('ownership', ['author'])}
        schema={schema}
        data={data}
      />,
    );

    expect(container.querySelector('h2')?.textContent).toBe(
      'The ownership fieldset',
    );
  });

  it('leaves the default fieldset without a heading', () => {
    const { container } = render(
      <FieldsetView
        fieldset={fieldset('default', ['author'])}
        schema={schema}
        data={data}
      />,
    );

    expect(container.querySelector('h2')).toBeNull();
  });

  it('wraps the fields in a fieldset element', () => {
    const { container } = render(
      <FieldsetView
        fieldset={fieldset('default', ['author'])}
        schema={schema}
        data={data}
      />,
    );

    expect(container.querySelector('div.fieldset')).not.toBeNull();
  });

  it('renders one field per declared field, in the declared order', () => {
    const { container } = render(
      <FieldsetView
        fieldset={fieldset('default', ['count', 'author'])}
        schema={schema}
        data={data}
      />,
    );

    expect(renderedFieldIds(container)).toEqual(['count', 'author']);
  });

  it("renders each field's own value", () => {
    const { container } = render(
      <FieldsetView
        fieldset={fieldset('default', ['count', 'author'])}
        schema={schema}
        data={data}
      />,
    );

    expect(
      Array.from(container.querySelectorAll('.value')).map(
        (value) => value.textContent,
      ),
    ).toEqual(['3', 'Érico']);
  });

  it('renders an empty fieldset when it declares no fields', () => {
    const { container } = render(
      <FieldsetView
        fieldset={fieldset('default', undefined)}
        schema={schema}
        data={data}
      />,
    );

    expect(container.querySelector('div.fieldset')).not.toBeNull();
    expect(renderedFieldIds(container)).toEqual([]);
  });

  it('renders a field that the schema does not describe', () => {
    const { container } = render(
      <FieldsetView
        fieldset={fieldset('default', ['absent'])}
        schema={schema}
        data={data}
      />,
    );

    expect(renderedFieldIds(container)).toEqual(['absent']);
  });

  it('does not throw when the schema is undefined', () => {
    expect(() =>
      render(
        <FieldsetView
          fieldset={fieldset('default', ['author'])}
          schema={undefined}
          data={data}
        />,
      ),
    ).not.toThrow();
  });
});
