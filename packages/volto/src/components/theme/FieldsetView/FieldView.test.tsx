import type { ComponentType } from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import config from '@plone/volto/registry';
import FieldView from './FieldView';
import type { FieldDefinition } from './fields';

type Resolver = (field: FieldDefinition) => ComponentType<{ value: unknown }>;

const ValueWidget = ({ value }: { value: unknown }) => (
  <span data-testid="value">{String(value)}</span>
);

const ThrowingWidget = () => {
  throw new Error('widget blew up');
};

let originalViews: typeof config.widgets.views;

/**
 * Point `config.widgets.views.getWidget` at the given resolver. The test
 * config registry does not define `views` at all, so this also stands in for
 * the default configuration.
 */
const setResolver = (resolver: Resolver) => {
  config.widgets.views = {
    ...(config.widgets.views ?? {}),
    getWidget: resolver,
    // `getWidget` is not declared on WidgetsConfigViews yet.
  } as unknown as typeof config.widgets.views;
};

const field: FieldDefinition = {
  id: 'author',
  title: 'Author',
  widget: 'string',
};

const data = { author: 'Érico', title: 'Hello World!' };

beforeEach(() => {
  originalViews = config.widgets.views;
  setResolver(() => ValueWidget);
});

afterEach(() => {
  config.widgets.views = originalViews;
  vi.restoreAllMocks();
});

describe('FieldView', () => {
  it('labels the field with its title', () => {
    const { container } = render(<FieldView field={field} data={data} />);

    expect(container.querySelector('.ui.label')?.textContent).toBe('Author:');
  });

  it('exposes the field id as the label title attribute', () => {
    const { container } = render(<FieldView field={field} data={data} />);

    expect(container.querySelector('.ui.label')).toHaveAttribute(
      'title',
      'author',
    );
  });

  it("renders the field's value through the resolved widget", () => {
    const { getByTestId } = render(<FieldView field={field} data={data} />);

    expect(getByTestId('value').textContent).toBe('Érico');
  });

  it('asks the resolver for a widget using the whole field definition', () => {
    const resolver = vi.fn(() => ValueWidget);
    setResolver(resolver);

    render(<FieldView field={field} data={data} />);

    expect(resolver).toHaveBeenCalledWith(field);
  });

  it('takes the resolver from the configuration, so add-ons can replace it', () => {
    const AddonWidget = () => <span data-testid="addon">from the add-on</span>;
    setResolver(() => AddonWidget);

    const { getByTestId } = render(<FieldView field={field} data={data} />);

    expect(getByTestId('addon')).toBeInTheDocument();
  });

  it('renders the title field bare, with no label around it', () => {
    const titleField: FieldDefinition = {
      id: 'title',
      title: 'Title',
      widget: 'title',
    };

    const { container, getByTestId } = render(
      <FieldView field={titleField} data={data} />,
    );

    expect(container.querySelector('.ui.label')).toBeNull();
    expect(container.querySelector('.ui.grid')).toBeNull();
    expect(getByTestId('value').textContent).toBe('Hello World!');
  });

  it('contains a throwing widget instead of failing the whole view', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    setResolver(() => ThrowingWidget);

    expect(() => render(<FieldView field={field} data={data} />)).not.toThrow();
  });

  it('names the field in the error fallback', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    setResolver(() => ThrowingWidget);

    const { container } = render(<FieldView field={field} data={data} />);
    const fallback = container.querySelector('pre.error');

    expect(fallback?.textContent).toBe('<error: author>');
    expect(fallback?.textContent).not.toContain('[object Object]');
  });

  it('protects the title field with the error boundary too', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    setResolver(() => ThrowingWidget);
    const titleField: FieldDefinition = {
      id: 'title',
      title: 'Title',
      widget: 'title',
    };

    const { container } = render(<FieldView field={titleField} data={data} />);

    expect(container.querySelector('pre.error')?.textContent).toBe(
      '<error: title>',
    );
  });
});
