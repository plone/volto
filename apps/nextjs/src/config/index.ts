import config from '@plone/registry';
import Page from '@/views/Page/Page';

config.settings = {
  ...config.settings,
  apiPath: process.env.NEXT_PUBLIC_VERCEL_URL
    ? // Vercel does not prepend the schema to the NEXT_PUBLIC_VERCEL_URL automatic env var
      `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000',
};

config.views = {
  ...config.views,
  contentTypesViews: {
    'Plone Site': Page,
    Document: Page,
  },
  defaultView: Page,
};

export { config };
