import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../API';
import {
  type PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';

const emailSendDataSchema = z.object({
  name: z.string(),
  from: z.string(),
  to: z.string(),
  subject: z.string(),
  message: z.string(),
});

export const emailSendArgsSchema = z.object({
  data: emailSendDataSchema,
  config: PloneClientConfigSchema,
});

export type EmailSendArgs = z.infer<typeof emailSendArgsSchema>;

export const emailSend = async ({
  data,
  config,
}: EmailSendArgs): Promise<undefined> => {
  const validatedArgs = emailSendArgsSchema.parse({
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  return apiRequest('post', '/@email-send', options);
};

export const emailSendMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'email-send'],
  mutationFn: ({ data }: Omit<EmailSendArgs, 'config'>) =>
    emailSend({ data, config }),
});
