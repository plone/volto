import { addExtensionFieldToSchema } from './withBlockSchemaEnhancer';

describe('addExtensionFieldToSchema', () => {
  it('addExtensionFieldToSchema should add field to schema', () => {
    const testSchema = {
      fieldsets: [{ fields: [] }],
      properties: {},
    };
    const intl = { formatMessage: () => 'untitled' };
    const schema = addExtensionFieldToSchema({
      schema: testSchema,
      name: 'variation',
      intl,
      extensions: [{ id: 'default' }],
    });
    expect(testSchema.fieldsets[0].fields).toStrictEqual(['variation']);
    expect(schema.fieldsets[0].fields).toStrictEqual(['variation']);
    expect(schema).toBe(testSchema);
  });

  it('addExtensionFieldToSchema should add only add once to schema', () => {
    const testSchema = {
      fieldsets: [{ fields: ['variation'] }],
      properties: {},
    };
    const intl = { formatMessage: () => 'untitled' };
    const schema = addExtensionFieldToSchema({
      schema: testSchema,
      name: 'variation',
      intl,
      extensions: [{ id: 'default' }],
    });
    expect(testSchema.fieldsets[0].fields).toStrictEqual(['variation']);
    expect(schema.fieldsets[0].fields).toStrictEqual(['variation']);
    expect(schema).toBe(testSchema);
  });
});
