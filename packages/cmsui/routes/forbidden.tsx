import { Container } from '@plone/components/tailwind';
import { useTranslation } from 'react-i18next';

const Forbidden = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <div>
        <h1>{t('cmsui.forbidden')}</h1>
        <p>{t('cmsui.forbiddenDescription')}</p>
      </div>
    </Container>
  );
};
export default Forbidden;
