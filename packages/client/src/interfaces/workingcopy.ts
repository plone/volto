export interface GetWorkingcopyResponse {
  working_copy: {
    '@id': string;
    created: string;
    creator_name: string;
    creator_url: string;
    title: string;
  };
  working_copy_of: null;
}

export interface CreateWorkingcopyResponse {
  '@id': string;
}
