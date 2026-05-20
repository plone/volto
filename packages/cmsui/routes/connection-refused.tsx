import config from '@plone/registry';
import { Container } from '@plone/components';
import { useTranslation } from 'react-i18next';

const ConnectionRefused = () => {
  const { t } = useTranslation();

  return (
    <Container
      className={`
        mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center
      `}
    >
      <h1 className="mb-4 text-2xl font-bold">
        {t('cmsui.errorRoutes.connectionRefused')}
        {process.env.NODE_ENV === 'development' && (
          <>
            <br />
            <a
              className={`
                text-blue-600
                hover:underline
              `}
              href={config.settings.apiPath}
            >
              {config.settings.apiPath}
            </a>
          </>
        )}
      </h1>
      {process.env.NODE_ENV === 'development' && (
        <p className="mb-3 text-lg">
          {t('cmsui.errorRoutes.connectionRefusedDescription')}
        </p>
      )}
      {process.env.NODE_ENV !== 'development' && (
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
