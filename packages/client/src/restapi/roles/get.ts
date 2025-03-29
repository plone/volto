import { apiRequest, type ApiRequestParams } from '../../api';
import type { GetRolesResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export async function getRoles(
  this: PloneClient,
): Promise<RequestResponse<GetRolesResponse>> {
  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  return apiRequest('get', '/@roles', options);
}
