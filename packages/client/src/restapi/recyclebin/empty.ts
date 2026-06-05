import { apiRequest, type ApiRequestParams } from '../../api';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export async function emptyRecycleBin(
  this: PloneClient,
): Promise<RequestResponse<undefined>> {
  const options: ApiRequestParams = {
    config: this.config,
  };

  return apiRequest('delete', '/@recyclebin', options);
}
