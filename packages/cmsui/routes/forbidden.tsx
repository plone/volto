import { Container } from '@plone/components';
import { useTranslation } from 'react-i18next';

const Forbidden = () => {
  const { t } = useTranslation();
  return (
    <Container
      className={`
        mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center
      `}
    >
      <h1 className="mb-4 text-2xl font-bold">
        {t('cmsui.errorRoutes.forbidden')}
      </h1>
      <p className="mb-3 text-lg">
        {t('cmsui.errorRoutes.forbiddenDescription')}
      </p>
    </Container>
  );
};
export default Forbidden;
