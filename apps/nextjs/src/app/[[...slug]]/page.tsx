import { getServerQueryClient, client as ploneClient } from '@/helpers/client';
import { config } from '@/config';

const expand = ['breadcrumbs', 'navigation'];

export default async function Main({
  params,
}: {
  params: { slug?: string[] };
}) {
  const { slug = [] } = params;
  const path = '/' + slug.join('/');
  const queryClient = getServerQueryClient();
  const { getContentQuery } = ploneClient;
  const data = await queryClient.fetchQuery(getContentQuery({ path, expand }));
  const View =
    config.views.contentTypesViews[data['@type']] || config.views.defaultView;

  return (
    <main className="">
      <View content={data} />
    </main>
  );
}
