import { apiRequest, type ApiRequestParams } from '../../api';
import type { GetVocabulariesResponse } from '@plone/types';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

export async function getVocabularies(
  this: PloneClient,
): Promise<RequestResponse<GetVocabulariesResponse>> {
  const options: ApiRequestParams = {
    config: this.config,
    params: {},
  };

  return apiRequest('get', '/@vocabularies', options);
}
