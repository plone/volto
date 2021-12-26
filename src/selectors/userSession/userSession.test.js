import { loggedIn } from './userSession';

describe('loggedIn selector', () => {
  it('if the initial state (no key), user is not logged in', () => {
    const state = {
      userSession: {},
    };
    expect(loggedIn(state)).toEqual(false);
  });

  it('No JWT token in the state, user is not logged in', () => {
    const state = {
      userSession: {
        token: null,
      },
    };

    expect(loggedIn(state)).toEqual(false);
  });

  it('A JWT token is in the state, user is logged in', () => {
    const state = {
      userSession: {
        token: 'thetoken',
      },
    };

    expect(loggedIn(state)).toEqual(true);
  });
});
