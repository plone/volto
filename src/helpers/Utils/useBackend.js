import React from 'react';
import { useDispatch } from 'react-redux';
import useDeepCompareEffect from 'use-deep-compare-effect';

const useBackend = ({ subrequest, ...request }) => {
  const dispatch = useDispatch();

  const [result, setResult] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  useDeepCompareEffect(() => {
    let ignore = false;

    async function fetchData() {
      const action = {
        type: `USE_BACKEND_${subrequest}`,
        request,
      };
      const result = await dispatch(action);

      if (!ignore) {
        setLoading(false);
        setLoaded(true);
        setResult(result);
      }
    }
    setLoading(true);
    fetchData();

    return () => {
      ignore = true;
    };
  }, [request, dispatch, subrequest]);

  return {
    result,
    loaded,
    loading,
  };
};

export default useBackend;
