import type { Viewport } from 'next';
import '@plone/theming/styles/main.css';
import '@plone/slots/main.css';

export const viewport: Viewport = {
  themeColor: '#fff',
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
