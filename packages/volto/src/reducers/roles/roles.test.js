import roles from './roles';
import { LIST_ROLES } from '@plone/volto/constants/ActionTypes';

describe('Roles reducer', () => {
  it('should return the initial state', () => {
    expect(roles()).toEqual({
      error: null,
      roles: [],
      loaded: false,
      loading: false,
    });
  });

  it('should handle LIST_ROLES_PENDING', () => {
    expect(
      roles(undefined, {
        type: `${LIST_ROLES}_PENDING`,
      }),
    ).toEqual({
      error: null,
      roles: [],
      loaded: false,
      loading: true,
    });
  });

  it('should handle LIST_ROLES_SUCCESS', () => {
    expect(
      roles(undefined, {
        type: `${LIST_ROLES}_SUCCESS`,
        result: 'roles',
      }),
    ).toEqual({
      error: null,
      roles: 'roles',
      loaded: true,
      loading: false,
    });
  });

  it('should handle LIST_ROLES_FAIL', () => {
    expect(
      roles(undefined, {
        type: `${LIST_ROLES}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      error: 'failed',
      roles: [],
      loaded: false,
      loading: false,
    });
  });
});
