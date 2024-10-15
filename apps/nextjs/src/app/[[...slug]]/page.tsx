import SlotRenderer from '@plone/slots/src/SlotRenderer';
import { getServerQueryClient, client as ploneClient } from '@/helpers/client';

const expand = ['breadcrumbs', 'navigation'];

export default async function Main({
  params,
  searchParams,
}: {
  params: { slug?: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { slug = [] } = params;
  const path = '/' + slug.join('/');
  const queryClient = getServerQueryClient();
  const { getContentQuery } = ploneClient;
  const content = await queryClient.fetchQuery(
    getContentQuery({ path, expand }),
  );
  const search = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => search.append(key, v));
    } else if (value) {
      search.append(key, value);
    }
  });
  const location = {
    pathname: path,
    search: search.toString(),
    hash: '',
    state: null,
    key: '',
  };

  return (
    <>
      <SlotRenderer name="header" content={content} location={location} />
      <SlotRenderer name="main" content={content} location={location} />
      <SlotRenderer name="footer" content={content} location={location} />
    </>
  );
}
