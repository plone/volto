export interface GetGroupResponse {
  '@id': string;
  description: string;
  email: string;
  groupname: string;
  id: string;
  members: {
    '@id': string;
    items: any[];
    items_total: number;
  };
  roles: string[];
  title: string;
}

export interface GetGroupsResponse extends Array<GetGroupResponse> {}

export interface CreateGroupResponse extends GetGroupResponse {}
