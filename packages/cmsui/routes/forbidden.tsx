import { Container } from '@plone/components/tailwind';
import { useTranslation } from 'react-i18next';

const Forbidden = () => {
  const { t } = useTranslation();
  return (
    <Container className="mt-10 flex min-h-screen flex-col items-center font-sans text-xl">
      <h1 className="mb-4 text-2xl font-bold">{t('cmsui.forbidden')}</h1>
      <p className="mb-3 text-lg">{t('cmsui.forbiddenDescription')}</p>
    </Container>
  );
};
export default Forbidden;
