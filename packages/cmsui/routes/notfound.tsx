import { Container } from '@plone/components/tailwind';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <div>
        <h1>{t('cmsui.notFound')}</h1>
        <p>{t('cmsui.notFoundDescription')}</p>
        <p>
          {t('cmsui.SiteAdminstration')}
          <NavLink to="/contact-form">{t('cmsui.siteAdminstration')}</NavLink>
        </p>
        <p>{t('cmsui.thankyou')}</p>
      </div>
    </Container>
  );
};
export default NotFound;
