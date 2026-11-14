import React from 'react';
import { Provider } from 'react-intl-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import config from '@plone/volto/registry';
import ObjectListWidget from './ObjectListWidget';

vi.mock('@plone/volto/helpers/Loadable/Loadable');
vi.mock('@plone/volto/components/manage/Form');
beforeAll(async () => {
  const { __setLoadables } = await import(
    '@plone/volto/helpers/Loadable/Loadable'
  );
  await __setLoadables();
});

let mockSerial = 0;
const mockStore = configureStore();

vi.mock('uuid', () => {
  return {
    v4: vi.fn().mockImplementation(() => `id-${mockSerial++}`),
  };
});

const LinkSchema = {
  title: 'Link',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'href'],
    },
  ],
  properties: {
    title: { title: 'Title', type: 'string' },
    href: { title: 'Address', type: 'string' },
  },
  required: ['title'],
};

const items = [
  { '@id': 'a', title: 'First', href: 'https://a.example.org' },
  { '@id': 'b', title: 'Second', href: 'https://b.example.org' },
  { '@id': 'c', title: 'Third', href: 'https://c.example.org' },
];

const renderWidget = (props = {}) => {
  const store = mockStore({ intl: { locale: 'en', messages: {} } });
  const onChange = vi.fn();
  const utils = render(
    <Provider store={store}>
      <form onSubmit={props.outerSubmit || (() => {})}>
        <ObjectListWidget
          id="links"
          schema={LinkSchema}
          title="Links"
          onChange={onChange}
          value={items}
          {...props}
        />
      </form>
    </Provider>,
  );
  return { ...utils, onChange, store };
};

const OptionalSchema = { ...LinkSchema, required: [] };

const tableProps = { layout: 'table', columns: ['title', 'href'] };

afterEach(() => {
  delete global.ResizeObserver;
});

describe('ObjectListWidget accordion (default layout)', () => {
  it('keeps the accordion, with no table and no item menu', () => {
    const { container } = renderWidget();
    expect(container.querySelector('.objectlist-table')).toBeNull();
    expect(screen.queryByRole('menu')).toBeNull();
    expect(
      screen.getByRole('button', { name: 'Remove item #1' }),
    ).toBeInTheDocument();
  });

  it('removes an item at once, without a confirmation', () => {
    const { onChange } = renderWidget();
    fireEvent.click(screen.getByRole('button', { name: 'Remove item #2' }));
    expect(onChange).toHaveBeenCalledWith('links', [items[0], items[2]]);
    expect(screen.queryByText('Remove this item?')).toBeNull();
  });

  it('titles each item with the schema title, unless itemTitle is set', () => {
    const { container } = renderWidget();
    const titles = [
      ...container.querySelectorAll('.accordion-title-wrapper'),
    ].map((node) => node.textContent);
    expect(titles).toEqual(['Link #1', 'Link #2', 'Link #3']);
  });

  it('names each item with the itemTitle field', () => {
    const { container } = renderWidget({ itemTitle: 'title' });
    const titles = [
      ...container.querySelectorAll('.accordion-title-wrapper'),
    ].map((node) => node.textContent);
    expect(titles).toEqual(['First #1', 'Second #2', 'Third #3']);
  });

  it('accepts placeholderItemField as an alias of itemTitle', () => {
    const { container } = renderWidget({ placeholderItemField: 'title' });
    expect(
      container.querySelector('.accordion-title-wrapper').textContent,
    ).toBe('First #1');
  });
});

describe('ObjectListWidget table layout', () => {
  it('shows a row per item, with the chosen columns', () => {
    const { container } = renderWidget(tableProps);
    expect(container.querySelector('.objectlist-table')).not.toBeNull();
    const rows = container.querySelectorAll('.objectlist-table-row');
    expect(rows).toHaveLength(3);
    const heads = [
      ...container.querySelectorAll('.objectlist-table-heading'),
    ].map((node) => node.textContent);
    expect(heads).toEqual(['Title', 'Address']);
    expect(rows[0].querySelector('[data-column="href"]').textContent).toBe(
      'https://a.example.org',
    );
  });

  it('shows every field of the item schema when columns is not set', () => {
    const { container } = renderWidget({ layout: 'table' });
    const cols = [
      ...container
        .querySelector('.objectlist-table-row')
        .querySelectorAll('[data-column]'),
    ].map((node) => node.dataset.column);
    expect(cols).toEqual(['title', 'href']);
  });

  it('renders a cell with its cells renderer', () => {
    const cells = {
      title: (value, item) => <strong>{`${value}!${item['@id']}`}</strong>,
    };
    const { container } = renderWidget({ ...tableProps, cells });
    const cell = container
      .querySelector('.objectlist-table-row')
      .querySelector('[data-column="title"]');
    expect(cell.textContent).toBe('First!a');
    expect(cell.querySelector('strong')).not.toBeNull();
  });

  it('names an item in its Edit label with itemTitle', () => {
    renderWidget({
      ...tableProps,
      itemTitle: (item) => item.title.toUpperCase(),
    });
    expect(
      screen.getByRole('button', { name: 'Edit FIRST #1' }),
    ).toBeInTheDocument();
  });

  it('switches to a list of rows in a narrow container', () => {
    let observed;
    global.ResizeObserver = class {
      constructor(callback) {
        this.callback = callback;
        observed = this;
      }
      observe() {
        this.callback([{ contentRect: { width: 300 } }]);
      }
      disconnect() {}
    };
    const { container } = renderWidget(tableProps);
    expect(observed).toBeDefined();
    expect(container.querySelector('.objectlist-table.narrow')).not.toBeNull();
  });

  it('keeps the table when the container is wide', () => {
    global.ResizeObserver = class {
      constructor(callback) {
        this.callback = callback;
      }
      observe() {
        this.callback([{ contentRect: { width: 900 } }]);
      }
      disconnect() {}
    };
    const { container } = renderWidget(tableProps);
    expect(container.querySelector('.objectlist-table.narrow')).toBeNull();
  });
});

describe('ObjectListWidget item actions (table)', () => {
  const openMenu = (index) =>
    fireEvent.click(
      screen.getByRole('button', { name: `Actions for item #${index}` }),
    );

  it('moves an item up', () => {
    const { onChange } = renderWidget(tableProps);
    openMenu(2);
    fireEvent.click(screen.getByRole('menuitem', { name: 'Move up' }));
    expect(onChange).toHaveBeenCalledWith('links', [
      items[1],
      items[0],
      items[2],
    ]);
  });

  it('moves an item down', () => {
    const { onChange } = renderWidget(tableProps);
    openMenu(1);
    fireEvent.click(screen.getByRole('menuitem', { name: 'Move down' }));
    expect(onChange).toHaveBeenCalledWith('links', [
      items[1],
      items[0],
      items[2],
    ]);
  });

  it('disables Move up on the first item and Move down on the last', () => {
    renderWidget(tableProps);
    openMenu(1);
    expect(screen.getByRole('menuitem', { name: 'Move up' })).toBeDisabled();
    fireEvent.click(
      screen.getByRole('button', { name: 'Actions for item #1' }),
    );
    openMenu(3);
    expect(screen.getByRole('menuitem', { name: 'Move down' })).toBeDisabled();
  });

  it('duplicates an item with a new @id, after the original', () => {
    const { onChange } = renderWidget(tableProps);
    openMenu(1);
    fireEvent.click(screen.getByRole('menuitem', { name: 'Duplicate' }));
    const [, nextItems] = onChange.mock.calls[0];
    expect(nextItems).toHaveLength(4);
    expect(nextItems[1]).toEqual({
      ...items[0],
      '@id': expect.stringMatching(/^id-/),
    });
    expect(nextItems[1]['@id']).not.toBe(items[0]['@id']);
    expect(nextItems[2]).toBe(items[1]);
  });

  it('asks for confirmation before removing an item', () => {
    const { onChange } = renderWidget(tableProps);
    openMenu(2);
    fireEvent.click(screen.getByRole('menuitem', { name: 'Remove' }));
    expect(screen.getByText('Remove this item?')).toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('removes the item once confirmed', () => {
    const { onChange } = renderWidget(tableProps);
    openMenu(2);
    fireEvent.click(screen.getByRole('menuitem', { name: 'Remove' }));
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    expect(onChange).toHaveBeenCalledWith('links', [items[0], items[2]]);
  });

  it('disables Add and Duplicate at maxItems', () => {
    renderWidget({ ...tableProps, maxItems: 3 });
    expect(screen.getByRole('button', { name: 'Add Link' })).toBeDisabled();
    openMenu(1);
    expect(screen.getByRole('menuitem', { name: 'Duplicate' })).toBeDisabled();
  });

  it('keeps Add enabled below maxItems', () => {
    renderWidget({ ...tableProps, maxItems: 4 });
    expect(screen.getByRole('button', { name: 'Add Link' })).not.toBeDisabled();
  });
});

describe('ObjectListWidget edit dialog (table)', () => {
  it('opens the item in a dialog and writes it back on Save', () => {
    const { onChange } = renderWidget(tableProps);
    fireEvent.click(screen.getByRole('button', { name: 'Edit Link #2' }));
    expect(screen.getByText('Link #2')).toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onChange).toHaveBeenCalledWith('links', items);
  });

  it('discards the draft on Cancel', () => {
    const { onChange } = renderWidget(tableProps);
    fireEvent.click(screen.getByRole('button', { name: 'Edit Link #2' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.queryByText('Link #2')).toBeNull();
  });

  it('adds a new item at the end on Save, with an @id', () => {
    const { onChange } = renderWidget({
      ...tableProps,
      schema: OptionalSchema,
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add Link' }));
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    const [, nextItems] = onChange.mock.calls[0];
    expect(nextItems).toHaveLength(4);
    expect(nextItems[3]['@id']).toMatch(/^id-/);
  });

  it('does not let a submit of the dialog reach the content form', () => {
    const outerSubmit = vi.fn((e) => e.preventDefault());
    const { onChange, container } = renderWidget({
      ...tableProps,
      outerSubmit,
    });
    fireEvent.click(screen.getByRole('button', { name: 'Edit Link #1' }));
    const dialogForm = Array.from(document.querySelectorAll('form')).find(
      (form) => !container.contains(form),
    );
    expect(dialogForm).toBeDefined();
    fireEvent.submit(dialogForm);
    expect(outerSubmit).not.toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith('links', items);
  });
});

describe('ObjectListWidget validateItem', () => {
  it('passes the draft, its index and the resulting items to validateItem', () => {
    const validateItem = vi.fn(() => undefined);
    const { onChange } = renderWidget({ ...tableProps, validateItem });
    fireEvent.click(screen.getByRole('button', { name: 'Edit Link #2' }));
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(validateItem).toHaveBeenCalledWith(items[1], 1, items);
    expect(onChange).toHaveBeenCalledWith('links', items);
  });

  it('blocks Save and shows the message on the dialog', () => {
    const validateItem = vi.fn(() => 'This title is already in the list');
    const { onChange } = renderWidget({ ...tableProps, validateItem });
    fireEvent.click(screen.getByRole('button', { name: 'Edit Link #2' }));
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onChange).not.toHaveBeenCalled();
    expect(
      screen.getByText('This title is already in the list'),
    ).toBeInTheDocument();
    expect(screen.getByText('Link #2')).toBeInTheDocument();
  });

  it('sees the appended item as the new index on Add', () => {
    const validateItem = vi.fn(() => undefined);
    renderWidget({ ...tableProps, schema: OptionalSchema, validateItem });
    fireEvent.click(screen.getByRole('button', { name: 'Add Link' }));
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(validateItem.mock.calls[0][1]).toBe(3);
    expect(validateItem.mock.calls[0][2]).toHaveLength(4);
  });
});

describe('ObjectListWidget itemIds', () => {
  it('writes no @id on Add when itemIds is false', () => {
    const { onChange } = renderWidget({
      ...tableProps,
      schema: OptionalSchema,
      itemIds: false,
      value: [{ title: 'Only' }],
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add Link' }));
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    const [, nextItems] = onChange.mock.calls[0];
    expect(nextItems[1]).not.toHaveProperty('@id');
  });

  it('keys a list of strings by content and keeps repeated entries apart', () => {
    const StringSchema = {
      title: 'Email',
      fieldsets: [{ id: 'default', title: 'Default', fields: ['value'] }],
      properties: { value: { title: 'Email', type: 'string' } },
      required: [],
    };
    const { container } = renderWidget({
      schema: StringSchema,
      itemIds: false,
      layout: 'accordion',
      value: [{ value: 'a@example.org' }, { value: 'a@example.org' }],
    });
    expect(container.querySelectorAll('.accordion-title-wrapper')).toHaveLength(
      2,
    );
  });

  it('keeps the @id on the default layout', () => {
    const { onChange } = renderWidget({ value: [] });
    fireEvent.click(screen.getByRole('button', { name: 'Add Link' }));
    const [, nextItems] = onChange.mock.calls[0];
    expect(nextItems[0]['@id']).toMatch(/^id-/);
  });
});

describe('ObjectListWidget schema resolution', () => {
  it('calls a schema function with the props and intl', () => {
    const schemaFn = vi.fn(() => LinkSchema);
    renderWidget({ schema: schemaFn, layout: 'table', columns: ['title'] });
    expect(schemaFn).toHaveBeenCalled();
    const received = schemaFn.mock.calls[0][0];
    expect(received.intl).toBeDefined();
    expect(received.intl.formatMessage).toBeDefined();
    expect(received.props).toBeDefined();
    expect(received.id).toBe('links');
  });

  it('renders rows when schemaName names no registered utility', () => {
    const { container } = renderWidget({
      schemaName: 'doesNotExist',
      schema: undefined,
      layout: 'table',
    });
    expect(container.querySelectorAll('.objectlist-table-row')).toHaveLength(3);
  });

  it('renders accordions when schemaName names no registered utility', () => {
    const { container } = renderWidget({
      schemaName: 'doesNotExist',
      schema: undefined,
    });
    expect(container.querySelectorAll('.accordion-title-wrapper')).toHaveLength(
      3,
    );
  });

  it('uses a registered schema utility named by schemaName', () => {
    const utilitySchema = {
      title: 'Registered',
      fieldsets: [{ id: 'default', title: 'Default', fields: [] }],
      properties: {},
      required: [],
    };
    config.registerUtility({
      name: 'objectListWidgetTestSchema',
      type: 'schema',
      method: utilitySchema,
    });
    const { container } = renderWidget({
      schemaName: 'objectListWidgetTestSchema',
      schema: LinkSchema,
    });
    expect(
      container.querySelector('.accordion-title-wrapper').textContent,
    ).toBe('Registered #1');
  });
});

describe('ObjectListWidget errors from a failed submit', () => {
  const failed = (internalErrors) => Object.assign([], { internalErrors });

  it('opens the first item with errors in the table dialog', () => {
    const { rerender, store } = renderWidget(tableProps);
    rerender(
      <Provider store={store}>
        <form>
          <ObjectListWidget
            id="links"
            schema={LinkSchema}
            title="Links"
            onChange={() => {}}
            value={items}
            {...tableProps}
            error={failed({ 1: { title: ['Required input is missing.'] } })}
          />
        </form>
      </Provider>,
    );
    expect(screen.getByText('Link #2')).toBeInTheDocument();
    expect(
      screen.getByText(/Title: Required input is missing\./),
    ).toBeInTheDocument();
  });

  it('marks the rows of the items with errors', () => {
    const { container } = renderWidget({
      ...tableProps,
      error: failed({ 2: { title: ['Required input is missing.'] } }),
    });
    const rows = container.querySelectorAll('.objectlist-table-row');
    expect(rows[2].classList.contains('has-error')).toBe(true);
    expect(rows[0].classList.contains('has-error')).toBe(false);
  });

  it('opens the first item with errors in the accordion', () => {
    const setActiveObject = vi.fn();
    renderWidget({
      activeObject: 0,
      setActiveObject,
      error: failed({ 2: { title: ['Required input is missing.'] } }),
    });
    expect(setActiveObject).toHaveBeenCalledWith(2);
  });

  it('does not open an item when there are no errors', () => {
    const setActiveObject = vi.fn();
    renderWidget({ activeObject: 0, setActiveObject, error: [] });
    expect(setActiveObject).not.toHaveBeenCalled();
  });
});

describe('ObjectListWidget activeObject (controlled)', () => {
  it('keeps the open accordion item in the parent', () => {
    const setActiveObject = vi.fn();
    renderWidget({ activeObject: 1, setActiveObject });
    fireEvent.click(screen.getByLabelText('Show item #3'));
    expect(setActiveObject).toHaveBeenCalledWith(2);
  });
});

test('a non-table layout value falls back to the accordion', () => {
  const { container } = renderWidget({ layout: 'unknown' });
  expect(container.querySelector('.objectlist-table')).toBeNull();
});
