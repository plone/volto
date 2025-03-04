import { z } from 'zod';

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

export const createGroupDataSchema = z.object({
  description: z.string().optional(),
  email: z.string().optional(),
  groupname: z.string(),
  groups: z.array(z.string()).optional(),
  roles: z.array(z.string()).optional(),
  title: z.string().optional(),
  users: z.array(z.string()).optional(),
});

export const updateGroupDataSchema = z.object({
  description: z.string().optional(),
  email: z.string().optional(),
  title: z.string().optional(),
});

export interface CreateGroupResponse extends GetGroupResponse {}
