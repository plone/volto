/* eslint no-console: 0 */
import fs from 'fs';
import fse from 'fs-extra';
import { getLocalAddonInfo } from './getAddonInfo.js';

export async function consolidateAddon({ source = 'addon-testing-project' }) {
  const { name } = await getLocalAddonInfo({
    source: '.',
  });

  try {
    const filterFunc = (filenames) => {
      const IGNORE_FILES = ['node_modules', '.git'];
      return filenames.filter((item) => !IGNORE_FILES.includes(item));
    };
    const filenames = filterFunc(
      fs.readdirSync(`${source}/src/addons/${name}`),
    );

    filenames.forEach((filename) => {
      fse.copySync(`${source}/src/addons/${name}/${filename}`, `${filename}`, {
        overwrite: true,
      });
    });
  } catch (err) {
    console.error(err);
  }
}
