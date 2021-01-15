import { existsSync, lstatSync, readFileSync } from 'fs';

const criticalCssPath = 'public/critical.css';

export const hasCriticalCss = () => {
  return existsSync(criticalCssPath) && lstatSync(criticalCssPath).isFile();
};

/**
 * Checks if there is a CSS file 'critical.css' inside the 'public' directory.
 * If it is there, returns its contents.
 *
 * @returns {string|null}
 */
export const readCriticalCss = () => {
  if (!hasCriticalCss()) {
    return null;
  }
  return readFileSync(criticalCssPath);
};
