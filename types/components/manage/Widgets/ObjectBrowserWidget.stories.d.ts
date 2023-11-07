export namespace searchResults {
    let items: {
        '@id': string;
        '@type': string;
        CreationDate: string;
        Creator: string;
        Date: string;
        Description: string;
        EffectiveDate: string;
        ExpirationDate: string;
        ModificationDate: string;
        Subject: any[];
        Title: string;
        Type: string;
        UID: string;
        author_name: any;
        cmf_uid: number;
        commentators: any[];
        created: string;
        description: string;
        effective: string;
        end: any;
        exclude_from_nav: boolean;
        expires: string;
        getId: string;
        getObjSize: string;
        getPath: string;
        getRemoteUrl: any;
        getURL: string;
        id: string;
        in_response_to: any;
        is_folderish: boolean;
        last_comment_date: any;
        listCreators: string[];
        location: any;
        meta_type: string;
        mime_type: string;
        modified: string;
        portal_type: string;
        review_state: string;
        start: any;
        sync_uid: any;
        title: string;
        total_comments: number;
    }[];
}
declare namespace _default {
    export let title: string;
    export namespace argTypes {
        namespace selectableTypes {
            let name: string;
            let description: string;
            namespace table {
                namespace type {
                    let summary: string;
                    let detail: string;
                }
            }
            namespace control {
                let type_1: any;
                export { type_1 as type };
            }
        }
    }
    export { OBC as component };
    export let decorators: ((Story: any) => JSX.Element)[];
    export let excludeStories: string[];
}
export default _default;
export function Connected(): JSX.Element;
export function SingleElement(): JSX.Element;
export function Placeholder(): JSX.Element;
export function Image(): JSX.Element;
export function InitalPath(): JSX.Element;
export function SelectableType(): JSX.Element;
import { ObjectBrowserWidgetComponent as OBC } from './ObjectBrowserWidget';
