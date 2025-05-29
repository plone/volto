import { describe, it, expect, afterEach } from 'vitest';
import { flattenToAppURL } from './flattenToAppURL';

const API_PATH = 'http://localhost:8080/Plone';

describe('flattenToAppURL', () => {
  it('should flatten URLs correctly', () => {
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

    const result = flattenToAppURL(input as any, API_PATH);
    expect(result).toEqual(expectedOutput);
  });
});
