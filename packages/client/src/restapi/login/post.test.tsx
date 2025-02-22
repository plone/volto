import { setup, teardown } from '../../resetFixture';
import { beforeEach, expect, test } from 'vitest';
import PloneClient from '../../client';
import { login, loginMutation } from './post';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('Login', () => {
  test('login request function', async () => {
    const options = loginMutation({ config: cli.config });
    expect(options.mutationKey).toEqual(['login']);
    expect(options.mutationFn).toBeTypeOf('function');

    const result = await login({
      username: 'admin',
      password: 'secret',
      config: cli.config,
    });
    expect(result).toBeTypeOf('object');
    expect(result.token).toBeTypeOf('string');
  });

  test('loginMutation options factories', async () => {
    const options = loginMutation({ config: cli.config });
    expect(options.mutationKey).toEqual(['login']);
    expect(options.mutationFn).toBeTypeOf('function');

    const login = await options.mutationFn({
      username: 'admin',
      password: 'secret',
    });
    expect(login).toBeTypeOf('object');
    expect(login.token).toBeTypeOf('string');
  });
});
