import { apiRequest, type ApiRequestParams } from '../../api';
import type { GetAllAliasesResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export async function getAllAliases(
  this: PloneClient,
): Promise<RequestResponse<GetAllAliasesResponse>> {
  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  return apiRequest('get', '/@aliases', options);
}
