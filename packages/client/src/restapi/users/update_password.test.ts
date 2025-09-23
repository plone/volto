import {
  getUniqueEntityName,
  loginWithCreate,
  setup,
  teardown,
} from '../../utils/test';
import { afterEach, beforeEach, describe, test } from 'vitest';
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

describe('PasswordUpdate', () => {
  test('Successful', async () => {
    const username = getUniqueEntityName('resetTestUser');
    const userData = {
      username,
      email: `${username}@example.com`,
      password: 'password',
      roles: ['Site Administrator'],
    };

    await loginWithCreate(cli, userData);

    const resetUserData = {
      old_password: 'password',
      new_password: 'changedpassword',
    };

    const result = await cli.updatePassword({
      userId: username,
      data: resetUserData,
    });
  });
});
