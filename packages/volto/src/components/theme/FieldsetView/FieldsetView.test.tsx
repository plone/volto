import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import type { JSONSchema, JSONSchemaFieldsets } from '@plone/types';
import config from '@plone/volto/registry';
import { widgetMapping } from '@plone/volto/config/Widgets';
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

/**
 * The case from issue #8428, end to end: a `Person` content type whose
 * `social_links` field asks for an add-on widget through the schema, rendered
 * against the real view registry rather than a mocked resolver.
 */
describe('a field whose backend schema asks for a widget', () => {
  const SocialMediaWidget = ({ value }: { value: unknown }) => (
    <span className="social-media">{JSON.stringify(value)}</span>
  );

  const personSchema = {
    title: 'Person',
    type: 'object',
    required: ['title'],
    fieldsets: [],
    properties: {
      social_links: {
        behavior: 'plonegovbr.socialmedia.links',
        factory: 'JSONField',
        title: 'Profiles',
        type: 'dict',
        widget: 'json',
        widgetOptions: {
          frontendOptions: {
            widget: 'social_media_object_list',
            widgetProps: { schemaName: 'socialMedia' },
          },
        },
      },
      // A field whose declared widget *is* registered, so that the fallback
      // has somewhere to land when the hinted widget is missing.
      motto: {
        factory: 'Text',
        title: 'Motto',
        type: 'string',
        widget: 'textarea',
        widgetOptions: {
          frontendOptions: { widget: 'not_installed_widget' },
        },
      },
    },
  } as unknown as JSONSchema;

  const person = {
    social_links: { bluesky: '@ericof' },
    motto: 'Live long and prosper',
  };

  const useRegistry = (addonInstalled: boolean) => {
    config.widgets.views = {
      ...widgetMapping.views,
      widget: {
        ...widgetMapping.views.widget,
        ...(addonInstalled
          ? { social_media_object_list: SocialMediaWidget }
          : {}),
      },
    } as unknown as typeof config.widgets.views;
  };

  const renderField = (fieldName: string) =>
    render(
      <FieldsetView
        fieldset={fieldset('social_media', [fieldName])}
        schema={personSchema}
        data={person}
      />,
    );

  it('renders it with the widget the schema asked for', () => {
    useRegistry(true);

    const { container } = renderField('social_links');

    expect(container.querySelector('.social-media')?.textContent).toBe(
      '{"bluesky":"@ericof"}',
    );
  });

  it('passes the widget props from the schema down to it', () => {
    useRegistry(true);
    const seen: Record<string, any>[] = [];
    config.widgets.views = {
      ...config.widgets.views,
      widget: {
        ...config.widgets.views.widget,
        social_media_object_list: (props: Record<string, any>) => {
          seen.push(props);
          return null;
        },
      },
    } as unknown as typeof config.widgets.views;

    renderField('social_links');

    expect(seen[0]).toMatchObject({ schemaName: 'socialMedia' });
  });

  it('falls back to the declared widget when the hinted one is missing', () => {
    useRegistry(false);

    const { container } = renderField('motto');

    expect(container.textContent).toContain('Live long and prosper');
    expect(container.querySelector('pre.error')).toBeNull();
  });

  it('degrades to the error boundary when nothing can render the value', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    useRegistry(false);

    const { container } = renderField('social_links');

    expect(container.querySelector('pre.error')?.textContent).toBe(
      '<error: social_links>',
    );
    consoleError.mockRestore();
  });
});
