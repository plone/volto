import { Container } from '@plone/components/tailwind';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
const Unauthorized = () => {
  const { t } = useTranslation();

  return (
    <Container className="mt-10 flex min-h-screen flex-col items-center font-sans text-xl">
      <h1 className="mb-4 text-2xl font-bold">{t('cmsui.unauthorized')}</h1>
      <p className="mb-3 text-lg">
        {t('cmsui.loginRequired')}
        <NavLink to="/login" className="text-blue-600 hover:underline">
          {t('login')}
        </NavLink>
      </p>
      <p className="mb-3 text-lg">
        {t('cmsui.contact')}
        <NavLink to="/contact-form" className="text-blue-600 hover:underline">
          {t('cmsui.siteAdminstration')}
        </NavLink>
      </p>
      <p className="text-lg">{t('cmsui.thankyou')}</p>
    </Container>
  );
};
export default Unauthorized;
