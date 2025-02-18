//useClient hook to replace repetitive declaration in the components
import { useEffect, useState } from 'react';

export function useClient() {
  const [isClient, setisClient] = useState(false);
  useEffect(() => {
    setisClient(true);
  }, []);

  return isClient;
}
