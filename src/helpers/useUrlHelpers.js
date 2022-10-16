import { useSelector } from 'react-redux';
import { _getBaseUrl } from './Url/Url';

export default function useUrlHelpers() {
  // pseudocode
  const headers = useSelector((state) => state.hostHeaders);
  const config = {
    settings: {
      example_apiPath: headers.host,
    },
  };

  return {
    getBaseUrl: _getBaseUrl(config),
  };
}
