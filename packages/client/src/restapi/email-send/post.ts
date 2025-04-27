import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const emailSendDataSchema = z.object({
  name: z.string(),
  from: z.string(),
  to: z.string(),
  subject: z.string(),
  message: z.string(),
});

export const emailSendArgsSchema = z.object({
  data: emailSendDataSchema,
});

export type EmailSendArgs = z.infer<typeof emailSendArgsSchema>;

export async function emailSend(
  this: PloneClient,
  { data }: EmailSendArgs,
): Promise<RequestResponse<undefined>> {
  const validatedArgs = emailSendArgsSchema.parse({
    data,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: this.config,
  };

  return apiRequest('post', '/@email-send', options);
}
