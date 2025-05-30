import { useEffect } from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router';

export default function ErrorToast(queue) {
  const error = useRouteError();
  //Todo: translations
  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      queue.add(`Errore ${error.status}: ${error.statusText}`);
    } else if (error instanceof Error) {
      queue.add(error.message || 'Error');
    } else {
      queue.add('Unknown error');
    }
  }, [error]);

  return null; // Nessun rendering visivo
}
