import config from '@plone/registry';

interface CookieOptions {
  path: string;
  secure: any;
  expires: string | Date | null;
}
export const getCookieOptions = (options?: CookieOptions): CookieOptions => {
  const { path = '/', secure, expires, ...otherOptions } = options || {};

  let secureOption = secure;
  try {
    if (secureOption === undefined || secureOption === null) {
      const protocol = window?.location?.protocol ?? 'http';
      secureOption = protocol.startsWith('https') ? true : false;
    }
  } catch (e) {
    //window is not defined. It's ssr and we use 'secure' option passed from param
    secureOption = false;
  }

  return {
    path: path,
    expires: new Date(
      new Date().getTime() + config.settings.cookieExpires * 1000,
    ),
    secure: secureOption,
    ...otherOptions,
  };
};
