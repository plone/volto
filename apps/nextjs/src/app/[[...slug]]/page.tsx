import App from '@plone/slots/components/App';
import Providers from '@/components/providers/Providers';
import { getServerQueryClient, client as ploneClient } from '@/helpers/client';
import cx from 'clsx';
import { Inter } from 'next/font/google';

const expand = ['navroot', 'breadcrumbs', 'navigation', 'site'];

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] };
}) {
  const { slug = [] } = params;
  const path = '/' + slug.join('/');
  const queryClient = getServerQueryClient();
  const { getContentQuery } = ploneClient;
  const data = await queryClient.fetchQuery(getContentQuery({ path, expand }));

  return {
    title: `${data.title || ''} - Next.js app powered by Plone`,
    description: data.description,
  };
}

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

  const className = cx(
    inter.className,
    `view-${content.layout ?? 'view'}`,
    `contenttype-${content['@type'].replace(' ', '').toLowerCase()}`,
    `section-${slug[slug.length - 1] || 'home'}`,
  );

  return (
    <html lang={content.language?.token || 'en'}>
      <body className={className}>
        <Providers>
          <App content={content} location={location} />;
        </Providers>
      </body>
    </html>
  );
}
