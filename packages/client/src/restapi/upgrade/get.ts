import { apiRequest, type ApiRequestParams } from '../../api';
import type { GetUpgradeResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export async function getUpgrade(
  this: PloneClient,
): Promise<RequestResponse<GetUpgradeResponse>> {
  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  return apiRequest('get', '/@upgrade', options);
}
