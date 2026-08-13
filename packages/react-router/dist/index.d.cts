import * as react_router from 'react-router';
import { LoaderFunctionArgs } from 'react-router';
import { RouteConfigEntry } from '@react-router/dev/routes';
import { ReactRouterRouteEntry } from '@plone/types';

declare function getAddonRoutesConfig(routesConfig: Array<ReactRouterRouteEntry>, addonsInfo: Array<any>): Array<RouteConfigEntry>;
declare const cookie: react_router.Cookie;
declare function getAuthFromRequest(request: Request): Promise<string | undefined>;
declare function setAuthOnResponse(response: Response, token: string, options?: Parameters<typeof cookie.serialize>[1]): Promise<Response>;
declare function clearAuthOnResponse(response: Response, options?: Parameters<typeof cookie.serialize>[1]): Promise<Response>;
declare function getClearAuthCookieHeader(options?: Parameters<typeof cookie.serialize>[1]): Promise<string>;
declare function requireAuthCookie(request: Request): Promise<string>;
declare function redirectIfLoggedInLoader({ request, }: LoaderFunctionArgs): Promise<null>;
declare function redirectWithClearedCookie(url?: string): Promise<Response>;

export { clearAuthOnResponse, cookie, getAddonRoutesConfig, getAuthFromRequest, getClearAuthCookieHeader, redirectIfLoggedInLoader, redirectWithClearedCookie, requireAuthCookie, setAuthOnResponse };
