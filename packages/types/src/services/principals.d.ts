import { GetGroupsResponse } from './groups';
import { GetUsersResponse } from './users';

export interface GetPrincipalsResponse {
  groups: GetGroupsResponse;
  users: GetUsersResponse;
}
