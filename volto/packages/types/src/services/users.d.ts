export interface User {
  '@id': string;
  description: string;
  email: string;
  fullname: string;
  groups: {
    '@id': string;
    items: {
      id: string;
      title: string;
    }[];
    items_total: number;
  };
  home_page: string;
  id: string;
  location: string;
  portrait: null;
  roles: string[];
  username: string;
}

export type GetUsersResponse = Array<User>;
