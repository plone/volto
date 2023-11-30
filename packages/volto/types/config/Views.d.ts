export namespace layoutViews {
    export { DefaultView as document_view };
    export { SummaryView as summary_view };
    export { TabularView as tabular_view };
    export { ListingView as listing_view };
    export { LinkView as link_redirect_view };
    export { AlbumView as album_view };
}
export const contentTypesViews: {
    'News Item': any;
    File: any;
    Image: any;
    Event: any;
};
export const defaultView: any;
export const errorViews: {
    404: any;
    401: any;
    403: any;
    408: any;
    500: any;
    ECONNREFUSED: any;
    corsError: any;
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
