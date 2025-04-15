import { apiRequest, type ApiRequestParams } from '../../api';
import type { GetUserschemaResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export async function getUserschema(
  this: PloneClient,
): Promise<RequestResponse<GetUserschemaResponse>> {
  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  return apiRequest('get', '/@userschema', options);
}
