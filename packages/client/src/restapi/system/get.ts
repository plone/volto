import { apiRequest, type ApiRequestParams } from '../../api';
import type { GetSystemResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export async function getSystem(
  this: PloneClient,
): Promise<RequestResponse<GetSystemResponse>> {
  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  return apiRequest('get', '/@system', options);
}
