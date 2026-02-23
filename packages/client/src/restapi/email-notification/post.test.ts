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

describe('Email Notification', () => {
  test.skip('Successful', async () => {
    const emailData = {
      name: 'John Doe',
      from: 'john@doe.com',
      subject: 'Hello!',
      message: 'Just want to say hi.',
    };

    const result = await cli.emailNotification({ data: emailData });
    expect(result.status).toBe(204);
  });

  test.skip('Successful - user', async () => {
    const emailData = {
      name: 'John Doe',
      from: 'john@doe.com',
      subject: 'Hello!',
      message: 'Just want to say hi.',
    };

    const user = 'admin';

    const result = await cli.emailNotification({ user, data: emailData });
    expect(result.status).toBe(204);
  });
});
