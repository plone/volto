import {
  addExtensionFieldToSchema,
  applySchemaEnhancer,
  composeSchema,
  addStyling,
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

  it('applySchemaEnhancer should add field to schema if an schemaEnhancer is supplied in a local blocksConfig', () => {
    const testSchema = {
      fieldsets: [{ fields: [] }],
      properties: {},
    };
    const intl = { formatMessage: () => 'untitled' };

    const blocksConfig = {
      listing: {
        schemaEnhancer: ({ schema, formData, intl }) => {
          schema.properties.newField = {
            title: 'My new field',
          };
          return schema;
        },
      },
    };
    const schemaEnhanced = applySchemaEnhancer({
      schema: testSchema,
      formData: { '@type': 'listing' },
      intl,
      blocksConfig,
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

describe('composeSchema', () => {
  it('applies multiple schemaEnhancers', () => {
    const props = { schema: [] };
    const s1 = ({ schema }) => [...schema, 1];
    const s2 = ({ schema }) => [...schema, 2];

    const enhancer = composeSchema(s1, s2);
    const res = enhancer(props);

    expect(res).toStrictEqual([1, 2]);
  });

  it('can receive formData and other props', () => {
    const props = { schema: [], formData: { inc: 3 } };
    const s1 = ({ schema, formData }) => [...schema, formData.inc * 2];
    const s2 = ({ schema, formData }) => [...schema, formData.inc * 3];

    const enhancer = composeSchema(s1, s2);
    const res = enhancer(props);

    expect(res).toStrictEqual([6, 9]);
  });

  it('can be safely passed a non-existing enhancer', () => {
    const props = { schema: [], formData: { inc: 3 } };
    const s1 = ({ schema, formData }) => [...schema, formData.inc * 2];
    const s2 = ({ schema, formData }) => [...schema, formData.inc * 3];
    const s3 = undefined;

    const enhancer = composeSchema(s1, s3, s2);
    const res = enhancer(props);

    expect(res).toStrictEqual([6, 9]);
  });
});

describe('addStyling', () => {
  it('returns an enhanced schema with the styling wrapper object on it', () => {
    const intl = { formatMessage: () => 'Styling' };

    const schema = {
      fieldsets: [
        {
          id: 'default',
          title: 'Default',
          fields: [],
        },
      ],
      properties: {},
      required: [],
    };

    const result = addStyling({ schema, intl });

    expect(result).toStrictEqual({
      fieldsets: [
        { id: 'default', title: 'Default', fields: [] },
        { id: 'styling', title: 'Styling', fields: ['styles'] },
      ],
      properties: {
        styles: {
          widget: 'object',
          title: 'Styling',
          schema: {
            fieldsets: [
              {
                fields: [],
                id: 'default',
                title: 'Default',
              },
            ],
            properties: {},
            required: [],
          },
        },
      },
      required: [],
    });
  });

  it('multiple schema enhancers', () => {
    const intl = { formatMessage: () => 'Styling' };

    const schema1 = {
      fieldsets: [
        {
          id: 'default',
          title: 'Default',
          fields: [],
        },
      ],
      properties: {},
      required: [],
    };

    const schema2 = {
      fieldsets: [
        {
          id: 'default',
          title: 'Default',
          fields: [],
        },
      ],
      properties: {},
      required: [],
    };

    const result = addStyling({ schema: schema1, intl });

    // We add some fields to the styling schema
    result.properties.styles.schema.properties.align = {
      widget: 'align',
      title: 'align',
      actions: ['left', 'right', 'center'],
      default: 'left',
    };

    result.properties.styles.schema.fieldsets[0].fields = ['align'];

    const result2 = addStyling({ schema: schema2, intl });

    expect(result).toStrictEqual({
      fieldsets: [
        { id: 'default', title: 'Default', fields: [] },
        { id: 'styling', title: 'Styling', fields: ['styles'] },
      ],
      properties: {
        styles: {
          widget: 'object',
          title: 'Styling',
          schema: {
            fieldsets: [
              {
                fields: ['align'],
                id: 'default',
                title: 'Default',
              },
            ],
            properties: {
              align: {
                widget: 'align',
                title: 'align',
                actions: ['left', 'right', 'center'],
                default: 'left',
              },
            },
            required: [],
          },
        },
      },
      required: [],
    });

    expect(result2).toStrictEqual({
      fieldsets: [
        { id: 'default', title: 'Default', fields: [] },
        { id: 'styling', title: 'Styling', fields: ['styles'] },
      ],
      properties: {
        styles: {
          widget: 'object',
          title: 'Styling',
          schema: {
            fieldsets: [
              {
                fields: [],
                id: 'default',
                title: 'Default',
              },
            ],
            properties: {},
            required: [],
          },
        },
      },
      required: [],
    });
  });
});
