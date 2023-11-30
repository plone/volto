export function getExternalRoutes(): any[];
/**
 * Default routes array.
 * @array
 * @returns {array} Routes.
 */
export const multilingualRoutes: ({
    path: string;
    component: any;
    exact?: undefined;
} | {
    path: string;
    component: any;
    exact: boolean;
})[];
export const defaultRoutes: any[];
export default routes;
/**
 * Routes array.
 * @array
 * @returns {array} Routes.
 */
declare const routes: {
    path: string;
    component: any;
    routes: any[];
}[];
