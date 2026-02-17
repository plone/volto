import { apiRequest, type ApiRequestParams } from '../../api';
import type { DatabaseResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export async function getDatabase(
  this: PloneClient,
): Promise<RequestResponse<DatabaseResponse>> {
  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  return apiRequest('get', '/@database', options);
}
