import { apiRequest, type ApiRequestParams } from '../../api';
import type { GetQuerystringResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export async function getQuerystring(
  this: PloneClient,
): Promise<RequestResponse<GetQuerystringResponse>> {
  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  return apiRequest('get', '/@querystring', options);
}
