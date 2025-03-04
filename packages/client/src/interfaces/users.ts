import { z } from 'zod';

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

export const createUserDataSchema = z.object({
  description: z.string().optional(),
  email: z.string().email(),
  fullname: z.string().optional(),
  home_page: z.string().url().optional(),
  location: z.string().optional(),
  sendPasswordReset: z.boolean().optional(),
  username: z.string(),
  roles: z.array(z.string()).optional(),
  password: z.string().optional(),
});

const portraitSchema = z.object({
  'content-type': z.string(),
  data: z.string(),
  encoding: z.string(),
  filename: z.string(),
  scale: z.boolean().optional(),
});

export const updateUserDataSchema = z.object({
  description: z.string().optional(),
  email: z.string().email().optional(),
  fullname: z.string().optional(),
  home_page: z.string().url().optional(),
  location: z.string().optional(),
  username: z.string().optional(),
  portrait: portraitSchema.optional(),
});

export const resetPasswordWithTokenDataSchema = z.object({
  reset_token: z.string(),
  new_password: z.string(),
});

export const updatePasswordDataSchema = z.object({
  new_password: z.string(),
  old_password: z.string(),
});
