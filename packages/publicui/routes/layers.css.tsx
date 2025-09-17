import config from '@plone/registry';

export async function loader() {
  const cssLayers = config.settings.cssLayers;

  return new Response(`@layer ${cssLayers.join(', ')};`, {
    status: 200,
    headers: { 'Content-Type': 'text/css' },
  });
}
