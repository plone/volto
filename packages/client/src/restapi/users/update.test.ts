import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';

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

describe('Update User', () => {
  test('Successful', async () => {
    const randomId = uuid();

    const userData = {
      username: `updateTestUser${randomId}`,
      email: `updateTestUser${randomId}@example.com`,
      password: 'password',
    };

    const updateUserData = {
      username: 'changedUsername',
    };

    await cli.createUser({ data: userData });

    const result = await cli.updateUser({
      userId: userData.username,
      data: updateUserData,
    });

    const user = await cli.getUser({
      userId: userData.username,
    });

    expect(user.data.username).toBe('changedUsername');
  });

  test('Successful - potrait', async () => {
    const randomId = uuid().replace(/-/g, '');
    // We need to remove hyphens because the user portrait field replaces each hyphen in userId with double hyphens

    const userData = {
      username: `updateTestUser${randomId}`,
      email: `updateTestUser${randomId}@example.com`,
      password: 'password',
    };

    const updatePortraitData = {
      portrait: {
        'content-type': 'image/gif',
        data: 'R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=',
        encoding: 'base64',
        filename: 'image.gif',
      },
    };

    await cli.createUser({ data: userData });

    await cli.updateUser({
      userId: userData.username,
      data: updatePortraitData,
    });

    const user = await cli.getUser({
      userId: userData.username,
    });

    expect(user.data.portrait).toBe(
      `http://localhost:55001/plone/@portrait/${userData.username}`,
    );
  });

  test('Successful - potrait & scale', async () => {
    const randomId = uuid().replace(/-/g, '');
    // We need to remove hyphens because the user portrait field replaces each hyphen in userId with double hyphens

    const userData = {
      username: `updateTestUser${randomId}`,
      email: `updateTestUser${randomId}@example.com`,
      password: 'password',
    };

    const updatePortraitData = {
      portrait: {
        'content-type': 'image/gif',
        data: 'R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=',
        encoding: 'base64',
        filename: 'image.gif',
        scale: true,
      },
    };

    await cli.createUser({ data: userData });

    await cli.updateUser({
      userId: userData.username,
      data: updatePortraitData,
    });

    const user = await cli.getUser({
      userId: userData.username,
    });

    expect(user.data.portrait).toBe(
      `http://localhost:55001/plone/@portrait/${userData.username}`,
    );
  });

  test('Successful - username & portrait', async () => {
    const randomId = uuid().replace(/-/g, '');
    // We need to remove hyphens because the user portrait field replaces each hyphen in userId with double hyphens

    const userData = {
      username: `updateTestUser${randomId}`,
      email: `updateTestUser${randomId}@example.com`,
      password: 'password',
    };

    const updateUserData = {
      username: 'changedUsername',
      portrait: {
        'content-type': 'image/gif',
        data: 'R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=',
        encoding: 'base64',
        filename: 'image.gif',
        scale: true,
      },
    };

    await cli.createUser({ data: userData });

    await cli.updateUser({
      userId: userData.username,
      data: updateUserData,
    });

    const user = await cli.getUser({
      userId: userData.username,
    });

    expect(user.data.username).toBe(updateUserData.username);
    expect(user.data.portrait).toBe(
      `http://localhost:55001/plone/@portrait/${userData.username}`,
    );
  });
});
