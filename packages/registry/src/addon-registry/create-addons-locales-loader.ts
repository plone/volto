import fs from 'fs';
import path from 'path';
import type { AddonRegistry } from './addon-registry';

export function createAddonsLocalesLoader(registry: AddonRegistry) {
  const localesFolders = fs.readdirSync(
    path.join(registry.projectRootPath, 'locales'),
  );

  localesFolders.forEach((locale) => {
    const addonsLocalesInfo = registry.getAddonLocales(locale);

    Object.keys(addonsLocalesInfo).forEach((namespace) => {
      if (namespace !== 'common.json') {
        console.warn(
          'Only the "common" locales namespace is supported for now, skipping ',
          namespace,
        );
        return;
      }
      const file = path.join(
        registry.projectRootPath,
        'locales',
        locale,
        namespace,
      );
      fs.writeFileSync(
        file,
        JSON.stringify(addonsLocalesInfo[namespace], null, 2),
      );
    });
  });
}
