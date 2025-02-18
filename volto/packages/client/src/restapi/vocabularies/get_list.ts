import { apiRequest, type ApiRequestParams } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import type { GetVocabulariesListResponse } from '@plone/types';

export type VocabulariesListArgs = {
  config: PloneClientConfig;
};

export const getVocabulariesList = async ({
  config,
}: VocabulariesListArgs): Promise<GetVocabulariesListResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return apiRequest('get', '/@vocabularies', options);
};

export const getVocabulariesListQuery = ({ config }: VocabulariesListArgs) => ({
  queryKey: ['get', 'vocabulariesList'],
  queryFn: () => getVocabulariesList({ config }),
});
