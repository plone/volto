import { apiRequest, type ApiRequestParams } from '../../api';
import type { GetTypesResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export async function getTypes(
  this: PloneClient,
): Promise<RequestResponse<GetTypesResponse>> {
  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  return apiRequest('get', '/@types', options);
}
