import { Container } from '@plone/components';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

const Unauthorized = () => {
  const { t } = useTranslation();

  return (
    <Container
      className={`
        mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center
      `}
    >
      <h1 className="mb-4 text-2xl font-bold">
        {t('cmsui.errorRoutes.unauthorized')}
      </h1>
      <p className="mb-3 text-lg">
        {t('cmsui.errorRoutes.loginRequired')}
        <NavLink
          to="/login"
          className={`
            text-blue-600
            hover:underline
          `}
        >
          {t('cmsui.errorRoutes.login')}
        </NavLink>
      </p>
      <p className="mb-3 text-lg">
        {t('cmsui.errorRoutes.contact')}
        <NavLink
          to="/contact-form"
          className={`
            text-blue-600
            hover:underline
          `}
        >
          {t('cmsui.errorRoutes.siteAdminstration')}
        </NavLink>
      </p>
      <p className="text-lg">{t('cmsui.errorRoutes.thankyou')}</p>
    </Container>
  );
};
export default Unauthorized;
