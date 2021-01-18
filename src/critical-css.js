import { existsSync, lstatSync, readFileSync } from 'fs';

export const criticalCssPath = 'public/critical.css';

/**
 * Returns whether the critical CSS file exists or not.
 *
 * @returns {boolean}
 */
export const hasCriticalCss = () => {
  const e = existsSync(criticalCssPath);
  if (e) {
    const f = lstatSync(criticalCssPath);
    return f.isFile();
  }
  return false;
};

/**
 * Checks if there is a valid CSS file in the relative path `criticalCssPath`.
 * If it is there, returns its contents, and if not, returns null.
 *
 * @returns {string|null}
 */
export const readCriticalCss = () => {
  const has = hasCriticalCss();
  if (has) {
    return readFileSync(criticalCssPath, { encoding: 'utf-8' });
  }
  return null;
};
