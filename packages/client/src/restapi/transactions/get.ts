import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetTransactionsResponse } from '../../interfaces/transactions';

export type GetTransactionsArgs = {
  config: PloneClientConfig;
};

export const getTransactions = async ({
  config,
}: GetTransactionsArgs): Promise<GetTransactionsResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return apiRequest('get', '/@transactions', options);
};

export const getTransactionsQuery = ({ config }: GetTransactionsArgs) => ({
  queryKey: ['get', 'transactions'],
  queryFn: () => getTransactions({ config }),
});
