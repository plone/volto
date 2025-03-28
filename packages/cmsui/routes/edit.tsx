import type { RootLoader } from 'quanta/app/root';
import { useTranslation } from 'react-i18next';
import { useRouteLoaderData } from 'react-router';

export default function Edit() {
  const data = useRouteLoaderData<RootLoader>('root');
  const { t } = useTranslation();
  if (!data) return null;
  const { content } = data;

  return (
    <h1>
      {content.title} - {t('cmsui.edit')}
    </h1>
  );
  // return <App content={data} location={{ pathname }} />;
}
