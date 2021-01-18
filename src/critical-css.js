import { existsSync, lstatSync, readFileSync } from 'fs';

const criticalCssPath = 'public/critical.css';
const cacheLifetime = 5 * 60 * 1000; // 5 minutes

let cache = null;
let cacheTimeout = null;

/**
 * Returns whether the critical CSS file exists or not.
 *
 * @returns {boolean}
 */
export const hasCriticalCss = () => {
  return existsSync(criticalCssPath) && lstatSync(criticalCssPath).isFile();
};

/**
 * Checks if there is a valid CSS file in the relative path `criticalCssPath`.
 * If it is there, returns its contents after caching it for `cacheLifetime`
 * milliseconds. If not, returns null and attempts to update the cache on each
 * call.
 *
 * @returns {string|null}
 */
export const updateCriticalCss = () => {
  if (!hasCriticalCss()) {
    cache = null;
    return null;
  } else {
    cache = readFileSync(criticalCssPath);
  }

  if (cacheTimeout) {
    clearTimeout(cacheTimeout);
  }
  cacheTimeout = setTimeout(() => {
    cache = null;
  }, cacheLifetime);
  return cache;
};

/**
 * Reads the critical CSS cache. If well suited, updates the cache.
 *
 * @returns {string|null}
 */
export const readCriticalCss = () => {
  if (cache) {
    return cache;
  }
  updateCriticalCss();
  return cache;
};
