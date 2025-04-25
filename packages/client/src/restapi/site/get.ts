import { apiRequest, type ApiRequestParams } from '../../api';
import type { GetSiteResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export async function getSite(
  this: PloneClient,
): Promise<RequestResponse<GetSiteResponse>> {
  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  return apiRequest('get', '/@site', options);
}
