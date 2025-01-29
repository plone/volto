import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../API';
import {
  type PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';

const emailNotificationDataSchema = z.object({
  name: z.string(),
  from: z.string(),
  subject: z.string(),
  message: z.string(),
});

export const emailNotificationArgsSchema = z.object({
  user: z.string().optional(),
  data: emailNotificationDataSchema,
  config: PloneClientConfigSchema,
});

export type EmailNotificationArgs = z.infer<typeof emailNotificationArgsSchema>;

export const emailNotification = async ({
  user,
  data,
  config,
}: EmailNotificationArgs): Promise<undefined> => {
  const validatedArgs = emailNotificationArgsSchema.parse({
    user,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const emailNotificationPath = user
    ? `/@users/${user}/@email-notification`
    : '/@email-notification';

  return apiRequest('post', emailNotificationPath, options);
};

export const emailNotificationMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'email-notification'],
  mutationFn: ({ user, data }: Omit<EmailNotificationArgs, 'config'>) =>
    emailNotification({ user, data, config }),
});
