import { apiRequest, type ApiRequestParams } from '../../api';
import type { Addons } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export async function getAddons(
  this: PloneClient,
): Promise<RequestResponse<Addons>> {
  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  return apiRequest('get', '/@addons', options);
}
