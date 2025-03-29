import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const emailNotificationDataSchema = z.object({
  name: z.string(),
  from: z.string(),
  subject: z.string(),
  message: z.string(),
});

export const emailNotificationArgsSchema = z.object({
  user: z.string().optional(),
  data: emailNotificationDataSchema,
});

export type EmailNotificationArgs = z.infer<typeof emailNotificationArgsSchema>;

export async function emailNotification(
  this: PloneClient,
  { user, data }: EmailNotificationArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = emailNotificationArgsSchema.parse({
    user,
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  const emailNotificationPath = user
    ? `/@users/${user}/@email-notification`
    : '/@email-notification';

  return apiRequest('post', emailNotificationPath, options);
}
