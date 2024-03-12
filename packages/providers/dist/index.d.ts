import * as React from "react";
import { ReactNode } from "react";
import PloneClient from "@plone/client";
export type AnySearchSchema = {};
export interface Location<TSearchObj extends AnySearchSchema = {}> {
    href: string;
    pathname: string;
    search: TSearchObj;
    searchStr: string;
    hash: string;
}
interface RouterLocationProps {
    useLocation: () => Location | undefined;
    children: ReactNode;
}
export function RouterLocationProvider(props: RouterLocationProps): import("react/jsx-runtime").JSX.Element;
export function useRouterLocation(): Location<{}>;
export const PloneClientContext: React.Context<any>;
export const usePloneClient: () => any;
export type PloneClientProviderProps = {
    client: PloneClient;
    children?: React.ReactNode;
};
export const PloneClientProvider: ({ client, children, }: PloneClientProviderProps) => JSX.Element;
export { FlattenToAppURLProvider, useFlattenToAppURL } from '@plone/components';

//# sourceMappingURL=index.d.ts.map
