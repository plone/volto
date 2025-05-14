import { apiRequest, type ApiRequestParams } from '../../api';
import type { GetTransactionsResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export async function getTransactions(
  this: PloneClient,
): Promise<RequestResponse<GetTransactionsResponse>> {
  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  return apiRequest('get', '/@transactions', options);
}
