import cx from 'clsx';
import type { Viewport } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/components/providers/Providers';
import { getServerQueryClient, client as ploneClient } from '@/helpers/client';

const inter = Inter({ subsets: ['latin'] });

const expand = ['breadcrumbs', 'navigation'];

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
    title: `${data.title || ''} - NextJS-powered Plone`,
    description: data.description,
  };
}

export const viewport: Viewport = {
  themeColor: '#fff',
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { slug?: string[] };
}>) {
  const { slug = [] } = params;
  const path = '/' + slug.join('/');
  const queryClient = getServerQueryClient();
  const { getContentQuery } = ploneClient;
  const data = await queryClient.fetchQuery(getContentQuery({ path, expand }));

  const className = cx(
    inter.className,
    `view-${data.layout ?? 'view'}view`,
    `contenttype-${data['@type'].replace(' ', '').toLowerCase()}`,
    `section-${slug[slug.length - 1] || 'home'}`,
  );

  return (
    <html lang="en">
      <body className={className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
