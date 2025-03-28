import type { Route } from './+types/edit';
import { useTranslation } from 'react-i18next';
import { useRouteLoaderData } from 'react-router';

import type { Content } from '@plone/types';

export const meta: Route.MetaFunction = () => {
  return [];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loader({ params, request }: Route.LoaderArgs) {}

export default function Edit() {
  const { content } = useRouteLoaderData('root') as { content: Content };
  const { t } = useTranslation();
  // const pathname = useLocation().pathname;
  return (
    <h1>
      {content.title} - {t('cmsui.edit')}
    </h1>
  );
  // return <App content={data} location={{ pathname }} />;
}
