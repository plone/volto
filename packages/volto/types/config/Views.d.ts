export function installDefaultViews(config: any): any;
export namespace layoutViews {
    export { DefaultView as document_view };
    export { SummaryView as summary_view };
    export { TabularView as tabular_view };
    export { ListingView as listing_view };
    export { LinkView as link_redirect_view };
    export { AlbumView as album_view };
}
export const contentTypesViews: {
    'News Item': {
        ({ content }: {
            content: any;
        }): string;
        propTypes: {
            content: any;
        };
    };
    File: {
        ({ content }: {
            content: any;
        }): string;
        propTypes: {
            content: any;
        };
    };
    Image: {
        ({ content }: {
            content: any;
        }): string;
        propTypes: {
            content: any;
        };
    };
    Event: import("@loadable/component").LoadableComponent<any>;
};
export function defaultView(props: any): string;
export namespace defaultView { }
export const errorViews: {
    404: (props: any) => import("react/jsx-runtime").JSX.Element;
    401: (props: any) => import("react/jsx-runtime").JSX.Element;
    403: (props: any) => import("react/jsx-runtime").JSX.Element;
    408: () => string;
    500: (props: any) => import("react/jsx-runtime").JSX.Element;
    ECONNREFUSED: () => import("react/jsx-runtime").JSX.Element;
    corsError: () => string;
};
export namespace layoutViewsNamesMapping {
    export let album_view: string;
    export let event_listing: string;
    export let full_view: string;
    export let listing_view: string;
    export let summary_view: string;
    export let tabular_view: string;
    export let layout_view: string;
    export let document_view: string;
    export let folder_listing: string;
    export let newsitem_view: string;
    export let link_redirect_view: string;
    export let file_view: string;
    export let image_view: string;
    export let event_view: string;
    export let view: string;
    let _default: string;
    export { _default as default };
}
import DefaultView from '@plone/volto/components/theme/View/DefaultView';
import SummaryView from '@plone/volto/components/theme/View/SummaryView';
import TabularView from '@plone/volto/components/theme/View/TabularView';
import ListingView from '@plone/volto/components/theme/View/ListingView';
import LinkView from '@plone/volto/components/theme/View/LinkView';
import AlbumView from '@plone/volto/components/theme/View/AlbumView';
