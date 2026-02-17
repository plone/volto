import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';

import PloneClient from '../../client';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('Email Send', () => {
  test.skip('Successful', async () => {
    const emailData = {
      name: 'John Doe',
      from: 'john@doe.com',
      to: 'jane@doe.com',
      subject: 'Hello!',
      message: 'Just want to say hi.',
    };

    const result = await cli.emailSend({ data: emailData });
    expect(result.status).toBe(204);
  });
});
