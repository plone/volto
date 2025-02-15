import type { ConfigType } from '@plone/registry';

export default function install(config: ConfigType) {
  return config;
}

export { ContentsTable } from './components/ContentsTable';
export * from './providers/contents';
