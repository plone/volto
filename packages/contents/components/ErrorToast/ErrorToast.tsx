import { useEffect } from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router';
import { useTranslation } from 'react-i18next';

export default function ErrorToast(queue: any) {
  const error = useRouteError();
  const { t } = useTranslation();

  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      queue.add({
        title: `${t('contents.error')} ${error.status}:`,
        description: error.statusText,
      });
    } else if (error instanceof Error) {
      queue.add(error.message || t('contents.error'));
    } else {
      queue.add(t('contents.unknown_error'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return null; // Nessun rendering visivo
}
