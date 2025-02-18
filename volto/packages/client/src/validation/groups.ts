import { z } from 'zod';

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
