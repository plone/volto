import config from '@plone/registry';
import { Container } from '@plone/components';
import { useTranslation } from 'react-i18next';

const ConnectionRefused = () => {
  const { t } = useTranslation();
  const isDev = process.env.NODE_ENV === 'development';
  const apiPath = config?.settings?.apiPath;

  return (
    <Container
      className={`
        mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center
      `}
    >
      <h1 className="mb-4 text-2xl font-bold">
        {t('cmsui.errorRoutes.connectionRefused')}
        {isDev && apiPath && (
          <>
            <br />
            <a
              className={`
                text-blue-600
                hover:underline
              `}
              href={apiPath}
            >
              {apiPath}
            </a>
          </>
        )}
      </h1>

      {isDev ? (
        <p className="mb-3 text-lg">
          {t('cmsui.errorRoutes.connectionRefusedDescription')}
        </p>
      ) : (
        <>
          <p className="mb-3 text-lg">
            {t('cmsui.errorRoutes.connectionRefusedProduction')}
          </p>
          <p className="text-lg">{t('cmsui.errorRoutes.thankyou')}</p>
        </>
      )}
    </Container>
  );
};

export default ConnectionRefused;
