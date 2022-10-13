/* eslint no-console: 0 */
import fse from 'fs-extra';
import { getLocalAddonInfo } from './getAddonInfo.js';

export async function consolidateAddon({ source = 'addon-testing-project' }) {
  const { name } = await getLocalAddonInfo({
    source: '.',
  });

  try {
    fse.copySync(`${source}/src/addons/${name}/src`, `./src`, {
      overwrite: true,
    });
  } catch (err) {
    console.error(err);
  }
}
