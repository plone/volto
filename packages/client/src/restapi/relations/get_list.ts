import { apiRequest, type ApiRequestParams } from '../../api';
import type { GetAllRelationsResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export async function getAllRelations(
  this: PloneClient,
): Promise<RequestResponse<GetAllRelationsResponse>> {
  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  return apiRequest('get', '/@relations', options);
}
