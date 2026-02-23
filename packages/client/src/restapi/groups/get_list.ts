import { apiRequest, type ApiRequestParams } from '../../api';
import type { GetGroupsResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export async function getGroups(
  this: PloneClient,
): Promise<RequestResponse<GetGroupsResponse>> {
  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  return apiRequest('get', '/@groups', options);
}
