import { describe, it, expect, afterEach } from 'vitest';
import config from '@plone/registry';
import { bulkFlattenToAppURL } from './bulkFlattenToAppURL';

const API_PATH = 'http://example.com/api';
const INTERNAL_API_PATH = 'http://backend/api';

describe('bulkFlattenToAppURL', () => {
  afterEach(() => {
    config.settings = {};
  });

  it('should flatten URLs correctly with API_PATH', () => {
    config.settings.apiPath = API_PATH;

    const input = {
      '@id': `${API_PATH}/path/to/resource`,
      anotherField: `${API_PATH}/another/path`,
      nested: {
        '@id': `${API_PATH}/nested/resource`,
        anotherNestedField: `${API_PATH}/nested/another/path`,
      },
      arrayField: [
        {
          '@id': `${API_PATH}/array/resource/1`,
          anotherArrayField: `${API_PATH}/array/another/path/1`,
        },
        {
          '@id': `${API_PATH}/array/resource/2`,
          anotherArrayField: `${API_PATH}/array/another/path/2`,
        },
      ],
      stringField: 'This is a string',
      numberField: 42,
      booleanField: true,
      nullField: null,
      undefinedField: undefined,
    };

    const expectedOutput = {
      '@id': '/path/to/resource',
      anotherField: '/another/path',
      nested: {
        '@id': '/nested/resource',
        anotherNestedField: '/nested/another/path',
      },
      arrayField: [
        {
          '@id': '/array/resource/1',
          anotherArrayField: '/array/another/path/1',
        },
        {
          '@id': '/array/resource/2',
          anotherArrayField: '/array/another/path/2',
        },
      ],
      stringField: 'This is a string',
      numberField: 42,
      booleanField: true,
      nullField: null,
      undefinedField: undefined,
    };

    const result = bulkFlattenToAppURL(input as any);
    expect(result).toEqual(expectedOutput);
  });

  it('should flatten URLs correctly with INTERNAL_API_PATH', () => {
    config.settings.internalApiPath = INTERNAL_API_PATH;

    const input = {
      '@id': `${INTERNAL_API_PATH}/path/to/resource`,
      anotherField: `${INTERNAL_API_PATH}/another/path`,
      nested: {
        '@id': `${INTERNAL_API_PATH}/nested/resource`,
        anotherNestedField: `${INTERNAL_API_PATH}/nested/another/path`,
      },
      arrayField: [
        {
          '@id': `${INTERNAL_API_PATH}/array/resource/1`,
          anotherArrayField: `${INTERNAL_API_PATH}/array/another/path/1`,
        },
        {
          '@id': `${INTERNAL_API_PATH}/array/resource/2`,
          anotherArrayField: `${INTERNAL_API_PATH}/array/another/path/2`,
        },
      ],
      stringField: 'This is a string',
      numberField: 42,
      booleanField: true,
      nullField: null,
      undefinedField: undefined,
    };

    const expectedOutput = {
      '@id': '/path/to/resource',
      anotherField: '/another/path',
      nested: {
        '@id': '/nested/resource',
        anotherNestedField: '/nested/another/path',
      },
      arrayField: [
        {
          '@id': '/array/resource/1',
          anotherArrayField: '/array/another/path/1',
        },
        {
          '@id': '/array/resource/2',
          anotherArrayField: '/array/another/path/2',
        },
      ],
      stringField: 'This is a string',
      numberField: 42,
      booleanField: true,
      nullField: null,
      undefinedField: undefined,
    };

    const result = bulkFlattenToAppURL(input as any);
    expect(result).toEqual(expectedOutput);
  });
});
