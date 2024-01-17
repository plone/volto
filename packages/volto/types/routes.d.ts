export function getExternalRoutes(): {
    component: (props: any) => JSX.Element;
}[];
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
export const defaultRoutes: ({
    path: string;
    component: any;
    exact?: undefined;
} | {
    path: string;
    component: any;
    exact: boolean;
} | {
    component: (props: any) => JSX.Element;
} | {
    path: string[];
    component: any;
})[];
export default routes;
/**
 * Routes array.
 * @array
 * @returns {array} Routes.
 */
declare const routes: {
    path: string;
    component: any;
    routes: ({
        path: string;
        component: any;
        exact?: undefined;
    } | {
        path: string;
        component: any;
        exact: boolean;
    } | {
        component: (props: any) => JSX.Element;
    } | {
        path: string[];
        component: any;
    })[];
}[];
