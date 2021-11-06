import {
  addExtensionFieldToSchema,
  applySchemaEnhancer,
} from './withBlockSchemaEnhancer';

import config from '@plone/volto/registry';

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

describe('applySchemaEnhancer', () => {
  it('applySchemaEnhancer should add field to schema if an schemaEnhancer is supplied', () => {
    const testSchema = {
      fieldsets: [{ fields: [] }],
      properties: {},
    };
    const intl = { formatMessage: () => 'untitled' };

    config.blocks.blocksConfig.listing.schemaEnhancer = ({
      schema,
      formData,
      intl,
    }) => {
      schema.properties.newField = {
        title: 'My new field',
      };
      return schema;
    };
    const schemaEnhanced = applySchemaEnhancer({
      schema: testSchema,
      formData: { '@type': 'listing' },
      intl,
    });

    expect(schemaEnhanced.properties.newField.title).toStrictEqual(
      'My new field',
    );
  });
  it('applySchemaEnhancer should add field to schema if an schemaEnhancer is supplied in a variation', () => {
    const testSchema = {
      fieldsets: [{ fields: [] }],
      properties: {},
    };
    const intl = { formatMessage: () => 'untitled' };

    // Apply it to the default variation
    config.blocks.blocksConfig.listing.variations[0].schemaEnhancer = ({
      schema,
      formData,
      intl,
    }) => {
      schema.properties.newField = {
        title: 'My new field',
      };
      return schema;
    };
    const schemaEnhanced = applySchemaEnhancer({
      schema: testSchema,
      formData: { '@type': 'listing' },
      intl,
    });

    expect(schemaEnhanced.properties.newField.title).toStrictEqual(
      'My new field',
    );
  });
  it('applySchemaEnhancer should add field to schema if an schemaEnhancer is supplied in a variation, then the one in the main block config is applied too', () => {
    const testSchema = {
      fieldsets: [{ fields: [] }],
      properties: {},
    };
    const intl = { formatMessage: () => 'untitled' };

    config.blocks.blocksConfig.listing.schemaEnhancer = ({
      schema,
      formData,
      intl,
    }) => {
      schema.properties.newFieldFromMainConfig = {
        title: 'My new field from the main config',
      };
      return schema;
    };

    // Apply it to the default variation
    config.blocks.blocksConfig.listing.variations[0].schemaEnhancer = ({
      schema,
      formData,
      intl,
    }) => {
      schema.properties.newField = {
        title: 'My new field',
      };
      return schema;
    };
    const schemaEnhanced = applySchemaEnhancer({
      schema: testSchema,
      formData: { '@type': 'listing' },
      intl,
    });

    expect(schemaEnhanced.properties.newField.title).toStrictEqual(
      'My new field',
    );
    expect(
      schemaEnhanced.properties.newFieldFromMainConfig.title,
    ).toStrictEqual('My new field from the main config');
  });
  it('should add field to schema if an schemaEnhancer is supplied in a variation, then the one in the main block config is applied too and overwrites it', () => {
    const testSchema = {
      fieldsets: [{ fields: [] }],
      properties: {},
    };
    const intl = { formatMessage: () => 'untitled' };

    config.blocks.blocksConfig.listing.schemaEnhancer = ({
      schema,
      formData,
      intl,
    }) => {
      schema.properties.newField = {
        title: 'My new field from the main config',
      };
      return schema;
    };

    // Apply it to the default variation
    config.blocks.blocksConfig.listing.variations[0].schemaEnhancer = ({
      schema,
      formData,
      intl,
    }) => {
      schema.properties.newField = {
        title: 'My new field',
      };
      return schema;
    };
    const schemaEnhanced = applySchemaEnhancer({
      schema: testSchema,
      formData: { '@type': 'listing' },
      intl,
    });

    expect(schemaEnhanced.properties.newField.title).toStrictEqual(
      'My new field from the main config',
    );
  });
});
