import { Container } from '@plone/components/tailwind';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
const Unauthorized = () => {
  const { t } = useTranslation();

  return (
    <Container className="flex min-h-screen flex-col items-center justify-center font-sans text-xl">
      <h1 className="text-green-900">{t('cmsui.unauthorized')}</h1>
      <p>
        {t('cmsui.loginRequired')}
        <NavLink to="/login">{t('login')}</NavLink>
      </p>
      <p>
        {t('cmsui.SiteAdminstration')}
        <NavLink to="/contact-form">{t('cmsui.siteAdminstration')}</NavLink>
      </p>
      <p>{t('cmsui.thankyou')}</p>
    </Container>
  );
};
export default Unauthorized;
