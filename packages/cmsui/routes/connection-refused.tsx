import config from '@plone/registry';
import { Container } from '@plone/components/tailwind';
import { useTranslation } from 'react-i18next';

const ConnectionRefused = () => {
  const { t } = useTranslation();

  return (
    <Container className="flex min-h-screen flex-col items-center justify-center font-sans text-xl">
      <h1 className="mb-6 text-center leading-10">
        {t('cmsui.connectionRefused')}
        {process.env.NODE_ENV === 'development' && (
          <>
            <br />
            <a
              className="text-blue-600 hover:underline"
              href={config.settings.apiPath}
            >
              {config.settings.apiPath}
            </a>
          </>
        )}
      </h1>
      {process.env.NODE_ENV === 'development' && (
        <p className="mx-auto mb-5 w-[475px] text-center">
          {t('cmsui.connectionRefusedDescription')}
        </p>
      )}
      {process.env.NODE_ENV !== 'development' && (
        <>
          <p className="mx-auto mb-5 w-[475px] text-center">
            {t('cmsui.connectionRefusedProduction')}
          </p>
          <p className="text-center">{t('thankyou')}</p>
        </>
      )}
    </Container>
  );
};
export default ConnectionRefused;
