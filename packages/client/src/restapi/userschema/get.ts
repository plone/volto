import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetUserschemaResponse } from '../../interfaces/userschema';

export type GetUserschemaArgs = {
  config: PloneClientConfig;
};

export const getUserschema = async ({
  config,
}: GetUserschemaArgs): Promise<GetUserschemaResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return apiRequest('get', '/@userschema', options);
};

export const getUserschemaQuery = ({ config }: GetUserschemaArgs) => ({
  queryKey: ['get', 'userschema'],
  queryFn: () => getUserschema({ config }),
});
