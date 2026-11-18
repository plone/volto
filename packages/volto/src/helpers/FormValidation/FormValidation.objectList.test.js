import FormValidation from './FormValidation';
import config from '@plone/volto/registry';

const formatMessage = (message) =>
  typeof message === 'string' ? message : message.defaultMessage;

const itemSchema = {
  title: 'Link',
  fieldsets: [{ id: 'default', title: 'Default', fields: ['title', 'href'] }],
  properties: {
    title: { title: 'Title', type: 'string' },
    href: { title: 'Address', type: 'string' },
  },
  required: ['title'],
};

const listSchema = (field) => ({
  fieldsets: [{ id: 'default', title: 'Default', fields: ['links'] }],
  properties: {
    links: { title: 'Links', type: 'array', widget: 'object_list', ...field },
  },
  required: [],
});

const validate = (schema, formData, intl) =>
  FormValidation.validateFieldsPerFieldset({
    schema,
    formData,
    formatMessage,
    intl,
  });

describe('FormValidation of object_list items', () => {
  it('reports a required item field by the index of the item', () => {
    const schema = listSchema({ schema: itemSchema });
    const errors = validate(schema, {
      links: [
        { '@id': 'a', title: 'First', href: 'https://a.example.org' },
        { '@id': 'b', title: '', href: 'https://b.example.org' },
      ],
    });
    expect(errors.links.internalErrors[1].title).toContain(
      'Required input is missing.',
    );
    expect(errors.links.internalErrors[0]).toBeUndefined();
  });

  it('adds one message for the list, so the form can show it', () => {
    const schema = listSchema({ schema: itemSchema });
    const errors = validate(schema, {
      links: [{ '@id': 'b', title: '' }],
    });
    expect(errors.links).toHaveLength(1);
    expect(errors.links[0]).toBe('One or more items have errors.');
    expect(errors.links.title).toBe('Links');
  });

  it('reports no error for a list whose items are valid', () => {
    const schema = listSchema({ schema: itemSchema });
    const errors = validate(schema, {
      links: [{ '@id': 'a', title: 'First' }],
    });
    expect(errors.links).toBeUndefined();
  });

  it('validates each item with the schemaExtender of the field, with intl', () => {
    const intl = { formatMessage, locale: 'en' };
    const schemaExtender = vi.fn((schema, item, received) => ({
      ...schema,
      required: [...schema.required, 'href'],
      extendedWith: received,
    }));
    const schema = listSchema({ schema: itemSchema, schemaExtender });
    const errors = validate(
      schema,
      { links: [{ '@id': 'a', title: 'First' }] },
      intl,
    );
    expect(schemaExtender).toHaveBeenCalled();
    expect(schemaExtender.mock.calls[0][2]).toBe(intl);
    expect(errors.links.internalErrors[0].href).toContain(
      'Required input is missing.',
    );
  });

  it('calls a schema function with the props and intl', () => {
    const intl = { formatMessage, locale: 'en' };
    const schemaFn = vi.fn(() => itemSchema);
    const schema = listSchema({ schema: schemaFn });
    validate(schema, { links: [{ '@id': 'a', title: 'First' }] }, intl);
    expect(schemaFn).toHaveBeenCalledTimes(1);
    const received = schemaFn.mock.calls[0][0];
    expect(received.intl).toBe(intl);
    expect(received.props).toBeDefined();
  });

  it('uses a registered schema utility named by schemaName', () => {
    config.registerUtility({
      name: 'formValidationItemSchema',
      type: 'schema',
      method: itemSchema,
    });
    const schema = listSchema({
      schemaName: 'formValidationItemSchema',
      schema: undefined,
    });
    const errors = validate(schema, { links: [{ '@id': 'b', title: '' }] });
    expect(errors.links.internalErrors[0].title).toBeDefined();
  });

  it('falls back to an empty item schema when schemaName is not registered', () => {
    const schema = listSchema({
      schemaName: 'formValidationMissingSchema',
      schema: undefined,
    });
    const errors = validate(schema, { links: [{ '@id': 'b', title: '' }] });
    expect(errors.links).toBeUndefined();
  });

  it('validates the fields of an object field', () => {
    const schema = {
      fieldsets: [{ id: 'default', title: 'Default', fields: ['link'] }],
      properties: {
        link: { title: 'Link', type: 'object', schema: itemSchema },
      },
      required: [],
    };
    const errors = validate(schema, { link: { title: '' } });
    expect(errors.link.internalErrors.title).toContain(
      'Required input is missing.',
    );
    expect(errors.link.title).toBe('Link');
  });

  it('leaves a field that is not an object_list or object alone', () => {
    const schema = {
      fieldsets: [{ id: 'default', title: 'Default', fields: ['text'] }],
      properties: {
        text: { title: 'Text', type: 'string', schema: itemSchema },
      },
      required: [],
    };
    const errors = validate(schema, { text: { title: '' } });
    expect(errors.text).toBeUndefined();
  });
});

describe('FormValidation called as Form.onSubmit calls it for blocks', () => {
  it('does not crash when an item schema function uses intl and no intl is passed', () => {
    // The sandbox block defines its item schema as a function of intl, and the
    // block validation in Form.onSubmit calls validateFieldsPerFieldset without
    // an intl argument. The nested validation must still resolve the schema.
    const blockSchema = {
      fieldsets: [{ id: 'default', title: 'Default', fields: ['tableItems'] }],
      properties: {
        tableItems: {
          title: 'Table items',
          type: 'array',
          widget: 'object_list',
          schema: ({ intl }) => ({
            title: intl.formatMessage({ id: 'Item', defaultMessage: 'Item' }),
            fieldsets: [{ id: 'default', title: 'Default', fields: ['title'] }],
            properties: { title: { title: 'Title', type: 'string' } },
            required: ['title'],
          }),
        },
      },
      required: [],
    };
    const formData = {
      tableItems: [{ '@id': 'item-1', title: '' }],
    };

    let errors;
    expect(() => {
      errors = FormValidation.validateFieldsPerFieldset({
        schema: blockSchema,
        formData,
        formatMessage,
      });
    }).not.toThrow();
    expect(errors.tableItems.internalErrors[0].title).toContain(
      'Required input is missing.',
    );
  });
});
