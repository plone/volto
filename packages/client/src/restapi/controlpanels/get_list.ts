import { apiRequest, type ApiRequestParams } from '../../api';
import type { GetControlpanelsResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export async function getControlpanels(
  this: PloneClient,
): Promise<RequestResponse<GetControlpanelsResponse>> {
  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  return apiRequest('get', '/@controlpanels', options);
}
