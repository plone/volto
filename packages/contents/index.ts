import type { ConfigType } from '@plone/registry';

export default function install(config: ConfigType) {
  config.registerRoute({
    type: 'route',
    file: '@plone/contents/routes/contents.tsx',
    path: 'contents',
  });
  return config;
}
