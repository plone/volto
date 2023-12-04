interface Role {
  '@id': string;
  '@type': string;
  id: string;
  title: string;
}

export interface GetRolesResponse extends Array<Role> {}
