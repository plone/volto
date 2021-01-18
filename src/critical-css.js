import { exists, lstat, readFile } from 'fs';

const criticalCssPath = 'public/critical.css';

/**
 * Returns whether the critical CSS file exists or not.
 *
 * @param callback {function} Receives a boolean parameter.
 */
export const hasCriticalCss = (callback) => {
  exists(criticalCssPath, (exists) => {
    lstat(criticalCssPath, (err, stats) => {
      callback(exists && !err && stats.isFile());
    });
  });
};

/**
 * Checks if there is a valid CSS file in the relative path `criticalCssPath`.
 * If it is there, returns its contents, and if not, returns null.
 *
 * @param callback {function} Receives an error parameter then a data parameter
 * which can be null.
 */
export const readCriticalCss = (callback) => {
  hasCriticalCss((has) => {
    if (!has) {
      callback(null, null);
    } else {
      readFile(criticalCssPath, null, (err, data) => {
        if (err) {
          callback(err);
        } else {
          callback(null, data);
        }
      });
    }
  });
};
