import config from '@plone/registry';

const settings = {
  apiPath: process.env.NEXT_PUBLIC_VERCEL_URL
    ? // Vercel does not prepend the schema to the NEXT_PUBLIC_VERCEL_URL automatic env var
      `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000',
};

//@ts-ignore
config.set('settings', settings);

export default config;
