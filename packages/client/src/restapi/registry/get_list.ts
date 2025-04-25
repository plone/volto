import { apiRequest, type ApiRequestParams } from '../../api';
import type { GetRegistryResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export async function getRegistry(
  this: PloneClient,
): Promise<RequestResponse<GetRegistryResponse>> {
  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  return apiRequest('get', '/@registry', options);
}
