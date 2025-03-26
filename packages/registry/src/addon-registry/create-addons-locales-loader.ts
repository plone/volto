import fs from 'fs';
import path from 'path';
import type { AddonRegistry } from './addon-registry';

export function createAddonsLocalesLoader(registry: AddonRegistry) {
  const addonsLocalesInfo = registry.getAddonsLocales();

  Object.entries(addonsLocalesInfo).forEach(([language, languageInfo]) => {
    Object.entries(languageInfo).forEach(([namespace, translations]) => {
      if (namespace !== 'common.json') {
        console.warn(
          'Only the "common" locales namespace is supported for now, skipping ',
          namespace,
        );
        return;
      }
      const localesDir = path.join(
        registry.projectRootPath,
        'locales',
        language,
      );
      if (!fs.existsSync(localesDir)) {
        fs.mkdirSync(localesDir, { recursive: true });
      }
      const file = path.join(localesDir, namespace);
      fs.writeFileSync(file, JSON.stringify(translations, null, 2));
    });
  });
}
