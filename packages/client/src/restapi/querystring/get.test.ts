import ploneClient from '../../client';
import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('Get QueryString', () => {
  test('Successful', async () => {
    const result = await cli.getQuerystring();

    expect(result.data['@id']).toBe(
      'http://localhost:55001/plone/@querystring',
    );
  });
});
