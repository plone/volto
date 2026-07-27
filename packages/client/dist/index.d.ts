import { ActionsResponse, Addons, GetAddonResponse, GetAllAliasesResponse, GetAliasesResponse, BreadcrumbsResponse, GetCommentsResponse, Content, CreateContentResponse, UpdateContentResponse, CopyMoveContentResponse, ContextNavigationResponse, GetControlpanelsResponse, GetControlpanelResponse, DatabaseResponse, GetGroupsResponse, GetGroupResponse, CreateGroupResponse, GetHistoryResponse, LockInfo, CreateLockResponse, Login, NavigationResponse, GetNavrootResponse, GetPrincipalsResponse, GetQuerysourcesResponse, GetQuerystringResponse, QuerystringSearchResponse, GetRegistryResponse, GetAllRelationsResponse, GetRelationsResponse, GetRolesResponse, GetRulesResponse, RuleRespose, SearchResponse, GetSiteResponse, GetSourceResponse, GetSystemResponse, GetTransactionsResponse, RevertTransactionsResponse, GetTranslationResponse, GetTypesResponse, GetTypeResponse, GetTypeFieldResponse, CreateTypeFieldResponse, GetUpgradeResponse, RunUpgradeResponse, GetUsersResponse, User, GetUserschemaResponse, GetVocabulariesResponse, GetVocabularyResponse, WorkflowResponse, CreateWorkflowResponse, GetWorkingcopyResponse, CreateWorkingcopyResponse } from '@plone/types';
import { z } from 'zod';

type RequestResponse<T> = {
  status: number;
  data: T;
};

declare const getActionsSchema: z.ZodObject<{
    path: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>;
type ActionsArgs = z.infer<typeof getActionsSchema>;
declare function getActions(this: PloneClient, { path }: ActionsArgs): Promise<RequestResponse<ActionsResponse>>;

declare function getAddons(this: PloneClient): Promise<RequestResponse<Addons>>;

declare const getAddonSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type AddonArgs = z.infer<typeof getAddonSchema> & {};
declare function getAddon(this: PloneClient, { id }: AddonArgs): Promise<RequestResponse<GetAddonResponse>>;

declare const installAddonSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type InstallAddonArgs = z.infer<typeof installAddonSchema>;
declare function installAddon(this: PloneClient, { id }: InstallAddonArgs): Promise<RequestResponse<undefined>>;

declare const uninstallAddonSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type UninstallAddonArgs = z.infer<typeof uninstallAddonSchema>;
declare function uninstallAddon(this: PloneClient, { id }: UninstallAddonArgs): Promise<RequestResponse<undefined>>;

declare const upgradeAddonSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type UpgradeAddonArgs = z.infer<typeof upgradeAddonSchema>;
declare function upgradeAddon(this: PloneClient, { id }: UpgradeAddonArgs): Promise<RequestResponse<undefined>>;

declare const installAddonProfileSchema: z.ZodObject<{
    id: z.ZodString;
    profile: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    profile: string;
}, {
    id: string;
    profile: string;
}>;
type InstallAddonProfileArgs = z.infer<typeof installAddonProfileSchema>;
declare function installAddonProfile(this: PloneClient, { id, profile }: InstallAddonProfileArgs): Promise<RequestResponse<undefined>>;

declare function getAllAliases(this: PloneClient): Promise<RequestResponse<GetAllAliasesResponse>>;

declare const getAliasesSchema: z.ZodObject<{
    path: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>;
type AliasesArgs = z.infer<typeof getAliasesSchema>;
declare function getAliases(this: PloneClient, { path }: AliasesArgs): Promise<RequestResponse<GetAliasesResponse>>;

declare const createAliasArgsSchema: z.ZodObject<{
    path: z.ZodString;
    data: z.ZodObject<{
        items: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
        }, {
            path: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        items: {
            path: string;
        }[];
    }, {
        items: {
            path: string;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    path: string;
    data: {
        items: {
            path: string;
        }[];
    };
}, {
    path: string;
    data: {
        items: {
            path: string;
        }[];
    };
}>;
type CreateAliasArgs = z.infer<typeof createAliasArgsSchema>;
declare function createAlias(this: PloneClient, { path, data }: CreateAliasArgs): Promise<RequestResponse<undefined>>;

declare const createAliasesArgsSchema: z.ZodObject<{
    data: z.ZodObject<{
        items: z.ZodArray<z.ZodObject<{
            datetime: z.ZodOptional<z.ZodString>;
            path: z.ZodString;
            'redirect-to': z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
            'redirect-to': string;
            datetime?: string | undefined;
        }, {
            path: string;
            'redirect-to': string;
            datetime?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        items: {
            path: string;
            'redirect-to': string;
            datetime?: string | undefined;
        }[];
    }, {
        items: {
            path: string;
            'redirect-to': string;
            datetime?: string | undefined;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        items: {
            path: string;
            'redirect-to': string;
            datetime?: string | undefined;
        }[];
    };
}, {
    data: {
        items: {
            path: string;
            'redirect-to': string;
            datetime?: string | undefined;
        }[];
    };
}>;
type CreateAliasesArgs = z.infer<typeof createAliasesArgsSchema>;
declare function createAliases(this: PloneClient, { data }: CreateAliasesArgs): Promise<RequestResponse<undefined>>;

declare const deleteAliasesArgsSchema: z.ZodObject<{
    path: z.ZodString;
    data: z.ZodObject<{
        items: z.ZodArray<z.ZodObject<{
            path: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
        }, {
            path: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        items: {
            path: string;
        }[];
    }, {
        items: {
            path: string;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    path: string;
    data: {
        items: {
            path: string;
        }[];
    };
}, {
    path: string;
    data: {
        items: {
            path: string;
        }[];
    };
}>;
type DeleteAliasesArgs = z.infer<typeof deleteAliasesArgsSchema>;
declare function deleteAliases(this: PloneClient, { path, data }: DeleteAliasesArgs): Promise<RequestResponse<undefined>>;

declare const getBreadcrumbsSchema: z.ZodObject<{
    path: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>;
type BreadcrumbsArgs = z.infer<typeof getBreadcrumbsSchema>;
declare function getBreadcrumbs(this: PloneClient, { path }: BreadcrumbsArgs): Promise<RequestResponse<BreadcrumbsResponse>>;

declare const getCommentsSchema: z.ZodObject<{
    path: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>;
type CommentsArgs = z.infer<typeof getCommentsSchema>;
declare function getComments(this: PloneClient, { path }: CommentsArgs): Promise<RequestResponse<GetCommentsResponse>>;

declare const createCommentArgsSchema: z.ZodObject<{
    path: z.ZodString;
    in_reply_to: z.ZodOptional<z.ZodString>;
    data: z.ZodObject<{
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        text: string;
    }, {
        text: string;
    }>;
}, "strip", z.ZodTypeAny, {
    path: string;
    data: {
        text: string;
    };
    in_reply_to?: string | undefined;
}, {
    path: string;
    data: {
        text: string;
    };
    in_reply_to?: string | undefined;
}>;
type CreateCommentArgs = z.infer<typeof createCommentArgsSchema>;
declare function createComment(this: PloneClient, { path, in_reply_to, data }: CreateCommentArgs): Promise<RequestResponse<undefined>>;

declare const updateCommentArgsSchema: z.ZodObject<{
    path: z.ZodString;
    comment_id: z.ZodString;
    data: z.ZodObject<{
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        text: string;
    }, {
        text: string;
    }>;
}, "strip", z.ZodTypeAny, {
    path: string;
    data: {
        text: string;
    };
    comment_id: string;
}, {
    path: string;
    data: {
        text: string;
    };
    comment_id: string;
}>;
type UpdateCommentArgs = z.infer<typeof updateCommentArgsSchema>;
declare function updateComment(this: PloneClient, { path, comment_id, data }: UpdateCommentArgs): Promise<RequestResponse<undefined>>;

declare const deleteCommentArgsSchema: z.ZodObject<{
    path: z.ZodString;
    comment_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
    comment_id: string;
}, {
    path: string;
    comment_id: string;
}>;
type DeleteCommentArgs = z.infer<typeof deleteCommentArgsSchema>;
declare function deleteComment(this: PloneClient, { path, comment_id }: DeleteCommentArgs): Promise<RequestResponse<undefined>>;

declare const getContentArgsSchema: z.ZodObject<{
    path: z.ZodString;
    version: z.ZodOptional<z.ZodString>;
    page: z.ZodOptional<z.ZodNumber>;
    fullObjects: z.ZodOptional<z.ZodBoolean>;
    expand: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    path: string;
    version?: string | undefined;
    page?: number | undefined;
    fullObjects?: boolean | undefined;
    expand?: string[] | undefined;
}, {
    path: string;
    version?: string | undefined;
    page?: number | undefined;
    fullObjects?: boolean | undefined;
    expand?: string[] | undefined;
}>;
type GetContentArgs = z.infer<typeof getContentArgsSchema>;
declare function getContent(this: PloneClient, { path, version, page, fullObjects, expand }: GetContentArgs): Promise<RequestResponse<Content>>;

declare const createContentArgsSchema: z.ZodObject<{
    path: z.ZodString;
    data: z.ZodObject<{
        '@id': z.ZodOptional<z.ZodString>;
        '@static_behaviors': z.ZodOptional<z.ZodUnknown>;
        '@type': z.ZodString;
        allow_discussion: z.ZodOptional<z.ZodBoolean>;
        blocks: z.ZodOptional<z.ZodUnknown>;
        blocks_layout: z.ZodOptional<z.ZodObject<{
            items: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            items: string[];
        }, {
            items: string[];
        }>>;
        contributors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        creators: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        description: z.ZodOptional<z.ZodString>;
        effective: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        exclude_from_nav: z.ZodOptional<z.ZodBoolean>;
        expires: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        file: z.ZodOptional<z.ZodObject<{
            'content-type': z.ZodString;
            data: z.ZodString;
            encoding: z.ZodString;
            filename: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        }, {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        }>>;
        id: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodObject<{
            'content-type': z.ZodString;
            data: z.ZodString;
            encoding: z.ZodString;
            filename: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        }, {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        }>>;
        language: z.ZodOptional<z.ZodString>;
        preview_caption: z.ZodOptional<z.ZodString>;
        preview_image: z.ZodOptional<z.ZodObject<{
            'content-type': z.ZodString;
            data: z.ZodString;
            encoding: z.ZodString;
            filename: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        }, {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        }>>;
        relatedItems: z.ZodOptional<z.ZodArray<z.ZodObject<{
            location: z.ZodOptional<z.ZodUnknown>;
            id: z.ZodOptional<z.ZodString>;
            "@id": z.ZodString;
            "@type": z.ZodOptional<z.ZodString>;
            CreationDate: z.ZodOptional<z.ZodString>;
            Creator: z.ZodOptional<z.ZodString>;
            Date: z.ZodOptional<z.ZodString>;
            Description: z.ZodOptional<z.ZodString>;
            EffectiveDate: z.ZodOptional<z.ZodUnknown>;
            ExpirationDate: z.ZodOptional<z.ZodUnknown>;
            ModificationDate: z.ZodOptional<z.ZodString>;
            Subject: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
            Title: z.ZodOptional<z.ZodString>;
            Type: z.ZodOptional<z.ZodString>;
            UID: z.ZodOptional<z.ZodString>;
            author_name: z.ZodOptional<z.ZodUnknown>;
            cmf_uid: z.ZodOptional<z.ZodUnknown>;
            commentators: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
            created: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            effective: z.ZodOptional<z.ZodString>;
            end: z.ZodOptional<z.ZodUnknown>;
            exclude_from_nav: z.ZodOptional<z.ZodBoolean>;
            expires: z.ZodOptional<z.ZodString>;
            getIcon: z.ZodOptional<z.ZodUnknown>;
            getId: z.ZodOptional<z.ZodString>;
            getObjSize: z.ZodOptional<z.ZodString>;
            getPath: z.ZodOptional<z.ZodString>;
            getRemoteUrl: z.ZodOptional<z.ZodUnknown>;
            getURL: z.ZodOptional<z.ZodString>;
            hasPreviewImage: z.ZodOptional<z.ZodUnknown>;
            head_title: z.ZodOptional<z.ZodUnknown>;
            image_field: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            image_scales: z.ZodOptional<z.ZodUnknown>;
            in_response_to: z.ZodOptional<z.ZodUnknown>;
            is_folderish: z.ZodOptional<z.ZodBoolean>;
            last_comment_date: z.ZodOptional<z.ZodUnknown>;
            listCreators: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            mime_type: z.ZodOptional<z.ZodString>;
            modified: z.ZodOptional<z.ZodString>;
            nav_title: z.ZodOptional<z.ZodUnknown>;
            portal_type: z.ZodOptional<z.ZodString>;
            review_state: z.ZodOptional<z.ZodString>;
            start: z.ZodOptional<z.ZodUnknown>;
            sync_uid: z.ZodOptional<z.ZodUnknown>;
            title: z.ZodString;
            total_comments: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            "@id": string;
            title: string;
            location?: unknown;
            id?: string | undefined;
            "@type"?: string | undefined;
            CreationDate?: string | undefined;
            Creator?: string | undefined;
            Date?: string | undefined;
            Description?: string | undefined;
            EffectiveDate?: unknown;
            ExpirationDate?: unknown;
            ModificationDate?: string | undefined;
            Subject?: unknown[] | undefined;
            Title?: string | undefined;
            Type?: string | undefined;
            UID?: string | undefined;
            author_name?: unknown;
            cmf_uid?: unknown;
            commentators?: unknown[] | undefined;
            created?: string | undefined;
            description?: string | undefined;
            effective?: string | undefined;
            end?: unknown;
            exclude_from_nav?: boolean | undefined;
            expires?: string | undefined;
            getIcon?: unknown;
            getId?: string | undefined;
            getObjSize?: string | undefined;
            getPath?: string | undefined;
            getRemoteUrl?: unknown;
            getURL?: string | undefined;
            hasPreviewImage?: unknown;
            head_title?: unknown;
            image_field?: string | null | undefined;
            image_scales?: unknown;
            in_response_to?: unknown;
            is_folderish?: boolean | undefined;
            last_comment_date?: unknown;
            listCreators?: string[] | undefined;
            mime_type?: string | undefined;
            modified?: string | undefined;
            nav_title?: unknown;
            portal_type?: string | undefined;
            review_state?: string | undefined;
            start?: unknown;
            sync_uid?: unknown;
            total_comments?: number | undefined;
        }, {
            "@id": string;
            title: string;
            location?: unknown;
            id?: string | undefined;
            "@type"?: string | undefined;
            CreationDate?: string | undefined;
            Creator?: string | undefined;
            Date?: string | undefined;
            Description?: string | undefined;
            EffectiveDate?: unknown;
            ExpirationDate?: unknown;
            ModificationDate?: string | undefined;
            Subject?: unknown[] | undefined;
            Title?: string | undefined;
            Type?: string | undefined;
            UID?: string | undefined;
            author_name?: unknown;
            cmf_uid?: unknown;
            commentators?: unknown[] | undefined;
            created?: string | undefined;
            description?: string | undefined;
            effective?: string | undefined;
            end?: unknown;
            exclude_from_nav?: boolean | undefined;
            expires?: string | undefined;
            getIcon?: unknown;
            getId?: string | undefined;
            getObjSize?: string | undefined;
            getPath?: string | undefined;
            getRemoteUrl?: unknown;
            getURL?: string | undefined;
            hasPreviewImage?: unknown;
            head_title?: unknown;
            image_field?: string | null | undefined;
            image_scales?: unknown;
            in_response_to?: unknown;
            is_folderish?: boolean | undefined;
            last_comment_date?: unknown;
            listCreators?: string[] | undefined;
            mime_type?: string | undefined;
            modified?: string | undefined;
            nav_title?: unknown;
            portal_type?: string | undefined;
            review_state?: string | undefined;
            start?: unknown;
            sync_uid?: unknown;
            total_comments?: number | undefined;
        }>, "many">>;
        rights: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        title: z.ZodString;
        versioning_enabled: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        '@type': string;
        title: string;
        id?: string | undefined;
        '@id'?: string | undefined;
        description?: string | undefined;
        effective?: string | null | undefined;
        exclude_from_nav?: boolean | undefined;
        expires?: string | null | undefined;
        '@static_behaviors'?: unknown;
        allow_discussion?: boolean | undefined;
        blocks?: unknown;
        blocks_layout?: {
            items: string[];
        } | undefined;
        contributors?: string[] | undefined;
        creators?: string[] | undefined;
        file?: {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        } | undefined;
        image?: {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        } | undefined;
        language?: string | undefined;
        preview_caption?: string | undefined;
        preview_image?: {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        } | undefined;
        relatedItems?: {
            "@id": string;
            title: string;
            location?: unknown;
            id?: string | undefined;
            "@type"?: string | undefined;
            CreationDate?: string | undefined;
            Creator?: string | undefined;
            Date?: string | undefined;
            Description?: string | undefined;
            EffectiveDate?: unknown;
            ExpirationDate?: unknown;
            ModificationDate?: string | undefined;
            Subject?: unknown[] | undefined;
            Title?: string | undefined;
            Type?: string | undefined;
            UID?: string | undefined;
            author_name?: unknown;
            cmf_uid?: unknown;
            commentators?: unknown[] | undefined;
            created?: string | undefined;
            description?: string | undefined;
            effective?: string | undefined;
            end?: unknown;
            exclude_from_nav?: boolean | undefined;
            expires?: string | undefined;
            getIcon?: unknown;
            getId?: string | undefined;
            getObjSize?: string | undefined;
            getPath?: string | undefined;
            getRemoteUrl?: unknown;
            getURL?: string | undefined;
            hasPreviewImage?: unknown;
            head_title?: unknown;
            image_field?: string | null | undefined;
            image_scales?: unknown;
            in_response_to?: unknown;
            is_folderish?: boolean | undefined;
            last_comment_date?: unknown;
            listCreators?: string[] | undefined;
            mime_type?: string | undefined;
            modified?: string | undefined;
            nav_title?: unknown;
            portal_type?: string | undefined;
            review_state?: string | undefined;
            start?: unknown;
            sync_uid?: unknown;
            total_comments?: number | undefined;
        }[] | undefined;
        rights?: string | null | undefined;
        versioning_enabled?: boolean | undefined;
    }, {
        '@type': string;
        title: string;
        id?: string | undefined;
        '@id'?: string | undefined;
        description?: string | undefined;
        effective?: string | null | undefined;
        exclude_from_nav?: boolean | undefined;
        expires?: string | null | undefined;
        '@static_behaviors'?: unknown;
        allow_discussion?: boolean | undefined;
        blocks?: unknown;
        blocks_layout?: {
            items: string[];
        } | undefined;
        contributors?: string[] | undefined;
        creators?: string[] | undefined;
        file?: {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        } | undefined;
        image?: {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        } | undefined;
        language?: string | undefined;
        preview_caption?: string | undefined;
        preview_image?: {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        } | undefined;
        relatedItems?: {
            "@id": string;
            title: string;
            location?: unknown;
            id?: string | undefined;
            "@type"?: string | undefined;
            CreationDate?: string | undefined;
            Creator?: string | undefined;
            Date?: string | undefined;
            Description?: string | undefined;
            EffectiveDate?: unknown;
            ExpirationDate?: unknown;
            ModificationDate?: string | undefined;
            Subject?: unknown[] | undefined;
            Title?: string | undefined;
            Type?: string | undefined;
            UID?: string | undefined;
            author_name?: unknown;
            cmf_uid?: unknown;
            commentators?: unknown[] | undefined;
            created?: string | undefined;
            description?: string | undefined;
            effective?: string | undefined;
            end?: unknown;
            exclude_from_nav?: boolean | undefined;
            expires?: string | undefined;
            getIcon?: unknown;
            getId?: string | undefined;
            getObjSize?: string | undefined;
            getPath?: string | undefined;
            getRemoteUrl?: unknown;
            getURL?: string | undefined;
            hasPreviewImage?: unknown;
            head_title?: unknown;
            image_field?: string | null | undefined;
            image_scales?: unknown;
            in_response_to?: unknown;
            is_folderish?: boolean | undefined;
            last_comment_date?: unknown;
            listCreators?: string[] | undefined;
            mime_type?: string | undefined;
            modified?: string | undefined;
            nav_title?: unknown;
            portal_type?: string | undefined;
            review_state?: string | undefined;
            start?: unknown;
            sync_uid?: unknown;
            total_comments?: number | undefined;
        }[] | undefined;
        rights?: string | null | undefined;
        versioning_enabled?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    path: string;
    data: {
        '@type': string;
        title: string;
        id?: string | undefined;
        '@id'?: string | undefined;
        description?: string | undefined;
        effective?: string | null | undefined;
        exclude_from_nav?: boolean | undefined;
        expires?: string | null | undefined;
        '@static_behaviors'?: unknown;
        allow_discussion?: boolean | undefined;
        blocks?: unknown;
        blocks_layout?: {
            items: string[];
        } | undefined;
        contributors?: string[] | undefined;
        creators?: string[] | undefined;
        file?: {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        } | undefined;
        image?: {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        } | undefined;
        language?: string | undefined;
        preview_caption?: string | undefined;
        preview_image?: {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        } | undefined;
        relatedItems?: {
            "@id": string;
            title: string;
            location?: unknown;
            id?: string | undefined;
            "@type"?: string | undefined;
            CreationDate?: string | undefined;
            Creator?: string | undefined;
            Date?: string | undefined;
            Description?: string | undefined;
            EffectiveDate?: unknown;
            ExpirationDate?: unknown;
            ModificationDate?: string | undefined;
            Subject?: unknown[] | undefined;
            Title?: string | undefined;
            Type?: string | undefined;
            UID?: string | undefined;
            author_name?: unknown;
            cmf_uid?: unknown;
            commentators?: unknown[] | undefined;
            created?: string | undefined;
            description?: string | undefined;
            effective?: string | undefined;
            end?: unknown;
            exclude_from_nav?: boolean | undefined;
            expires?: string | undefined;
            getIcon?: unknown;
            getId?: string | undefined;
            getObjSize?: string | undefined;
            getPath?: string | undefined;
            getRemoteUrl?: unknown;
            getURL?: string | undefined;
            hasPreviewImage?: unknown;
            head_title?: unknown;
            image_field?: string | null | undefined;
            image_scales?: unknown;
            in_response_to?: unknown;
            is_folderish?: boolean | undefined;
            last_comment_date?: unknown;
            listCreators?: string[] | undefined;
            mime_type?: string | undefined;
            modified?: string | undefined;
            nav_title?: unknown;
            portal_type?: string | undefined;
            review_state?: string | undefined;
            start?: unknown;
            sync_uid?: unknown;
            total_comments?: number | undefined;
        }[] | undefined;
        rights?: string | null | undefined;
        versioning_enabled?: boolean | undefined;
    };
}, {
    path: string;
    data: {
        '@type': string;
        title: string;
        id?: string | undefined;
        '@id'?: string | undefined;
        description?: string | undefined;
        effective?: string | null | undefined;
        exclude_from_nav?: boolean | undefined;
        expires?: string | null | undefined;
        '@static_behaviors'?: unknown;
        allow_discussion?: boolean | undefined;
        blocks?: unknown;
        blocks_layout?: {
            items: string[];
        } | undefined;
        contributors?: string[] | undefined;
        creators?: string[] | undefined;
        file?: {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        } | undefined;
        image?: {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        } | undefined;
        language?: string | undefined;
        preview_caption?: string | undefined;
        preview_image?: {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        } | undefined;
        relatedItems?: {
            "@id": string;
            title: string;
            location?: unknown;
            id?: string | undefined;
            "@type"?: string | undefined;
            CreationDate?: string | undefined;
            Creator?: string | undefined;
            Date?: string | undefined;
            Description?: string | undefined;
            EffectiveDate?: unknown;
            ExpirationDate?: unknown;
            ModificationDate?: string | undefined;
            Subject?: unknown[] | undefined;
            Title?: string | undefined;
            Type?: string | undefined;
            UID?: string | undefined;
            author_name?: unknown;
            cmf_uid?: unknown;
            commentators?: unknown[] | undefined;
            created?: string | undefined;
            description?: string | undefined;
            effective?: string | undefined;
            end?: unknown;
            exclude_from_nav?: boolean | undefined;
            expires?: string | undefined;
            getIcon?: unknown;
            getId?: string | undefined;
            getObjSize?: string | undefined;
            getPath?: string | undefined;
            getRemoteUrl?: unknown;
            getURL?: string | undefined;
            hasPreviewImage?: unknown;
            head_title?: unknown;
            image_field?: string | null | undefined;
            image_scales?: unknown;
            in_response_to?: unknown;
            is_folderish?: boolean | undefined;
            last_comment_date?: unknown;
            listCreators?: string[] | undefined;
            mime_type?: string | undefined;
            modified?: string | undefined;
            nav_title?: unknown;
            portal_type?: string | undefined;
            review_state?: string | undefined;
            start?: unknown;
            sync_uid?: unknown;
            total_comments?: number | undefined;
        }[] | undefined;
        rights?: string | null | undefined;
        versioning_enabled?: boolean | undefined;
    };
}>;
type CreateContentArgs = z.infer<typeof createContentArgsSchema>;
declare function createContent(this: PloneClient, { path, data }: CreateContentArgs): Promise<RequestResponse<CreateContentResponse>>;

declare const updateContentArgsSchema: z.ZodObject<{
    path: z.ZodString;
    data: z.ZodObject<{
        allow_discussion: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
        blocks: z.ZodOptional<z.ZodOptional<z.ZodUnknown>>;
        blocks_layout: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            items: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            items: string[];
        }, {
            items: string[];
        }>>>;
        contributors: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        creators: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        effective: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        exclude_from_nav: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
        expires: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        id: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        ordering: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            obj_id: z.ZodString;
            delta: z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"bottom">, z.ZodLiteral<"top">]>;
            subset_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            obj_id: string;
            delta: number | "bottom" | "top";
            subset_ids?: string[] | undefined;
        }, {
            obj_id: string;
            delta: number | "bottom" | "top";
            subset_ids?: string[] | undefined;
        }>>>;
        preview_caption: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        preview_image: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodObject<{
            'content-type': z.ZodString;
            data: z.ZodString;
            encoding: z.ZodString;
            filename: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        }, {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        }>>>>;
        relatedItems: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
            location: z.ZodOptional<z.ZodUnknown>;
            id: z.ZodOptional<z.ZodString>;
            "@id": z.ZodString;
            "@type": z.ZodOptional<z.ZodString>;
            CreationDate: z.ZodOptional<z.ZodString>;
            Creator: z.ZodOptional<z.ZodString>;
            Date: z.ZodOptional<z.ZodString>;
            Description: z.ZodOptional<z.ZodString>;
            EffectiveDate: z.ZodOptional<z.ZodUnknown>;
            ExpirationDate: z.ZodOptional<z.ZodUnknown>;
            ModificationDate: z.ZodOptional<z.ZodString>;
            Subject: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
            Title: z.ZodOptional<z.ZodString>;
            Type: z.ZodOptional<z.ZodString>;
            UID: z.ZodOptional<z.ZodString>;
            author_name: z.ZodOptional<z.ZodUnknown>;
            cmf_uid: z.ZodOptional<z.ZodUnknown>;
            commentators: z.ZodOptional<z.ZodArray<z.ZodUnknown, "many">>;
            created: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            effective: z.ZodOptional<z.ZodString>;
            end: z.ZodOptional<z.ZodUnknown>;
            exclude_from_nav: z.ZodOptional<z.ZodBoolean>;
            expires: z.ZodOptional<z.ZodString>;
            getIcon: z.ZodOptional<z.ZodUnknown>;
            getId: z.ZodOptional<z.ZodString>;
            getObjSize: z.ZodOptional<z.ZodString>;
            getPath: z.ZodOptional<z.ZodString>;
            getRemoteUrl: z.ZodOptional<z.ZodUnknown>;
            getURL: z.ZodOptional<z.ZodString>;
            hasPreviewImage: z.ZodOptional<z.ZodUnknown>;
            head_title: z.ZodOptional<z.ZodUnknown>;
            image_field: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            image_scales: z.ZodOptional<z.ZodUnknown>;
            in_response_to: z.ZodOptional<z.ZodUnknown>;
            is_folderish: z.ZodOptional<z.ZodBoolean>;
            last_comment_date: z.ZodOptional<z.ZodUnknown>;
            listCreators: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            mime_type: z.ZodOptional<z.ZodString>;
            modified: z.ZodOptional<z.ZodString>;
            nav_title: z.ZodOptional<z.ZodUnknown>;
            portal_type: z.ZodOptional<z.ZodString>;
            review_state: z.ZodOptional<z.ZodString>;
            start: z.ZodOptional<z.ZodUnknown>;
            sync_uid: z.ZodOptional<z.ZodUnknown>;
            title: z.ZodString;
            total_comments: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            "@id": string;
            title: string;
            location?: unknown;
            id?: string | undefined;
            "@type"?: string | undefined;
            CreationDate?: string | undefined;
            Creator?: string | undefined;
            Date?: string | undefined;
            Description?: string | undefined;
            EffectiveDate?: unknown;
            ExpirationDate?: unknown;
            ModificationDate?: string | undefined;
            Subject?: unknown[] | undefined;
            Title?: string | undefined;
            Type?: string | undefined;
            UID?: string | undefined;
            author_name?: unknown;
            cmf_uid?: unknown;
            commentators?: unknown[] | undefined;
            created?: string | undefined;
            description?: string | undefined;
            effective?: string | undefined;
            end?: unknown;
            exclude_from_nav?: boolean | undefined;
            expires?: string | undefined;
            getIcon?: unknown;
            getId?: string | undefined;
            getObjSize?: string | undefined;
            getPath?: string | undefined;
            getRemoteUrl?: unknown;
            getURL?: string | undefined;
            hasPreviewImage?: unknown;
            head_title?: unknown;
            image_field?: string | null | undefined;
            image_scales?: unknown;
            in_response_to?: unknown;
            is_folderish?: boolean | undefined;
            last_comment_date?: unknown;
            listCreators?: string[] | undefined;
            mime_type?: string | undefined;
            modified?: string | undefined;
            nav_title?: unknown;
            portal_type?: string | undefined;
            review_state?: string | undefined;
            start?: unknown;
            sync_uid?: unknown;
            total_comments?: number | undefined;
        }, {
            "@id": string;
            title: string;
            location?: unknown;
            id?: string | undefined;
            "@type"?: string | undefined;
            CreationDate?: string | undefined;
            Creator?: string | undefined;
            Date?: string | undefined;
            Description?: string | undefined;
            EffectiveDate?: unknown;
            ExpirationDate?: unknown;
            ModificationDate?: string | undefined;
            Subject?: unknown[] | undefined;
            Title?: string | undefined;
            Type?: string | undefined;
            UID?: string | undefined;
            author_name?: unknown;
            cmf_uid?: unknown;
            commentators?: unknown[] | undefined;
            created?: string | undefined;
            description?: string | undefined;
            effective?: string | undefined;
            end?: unknown;
            exclude_from_nav?: boolean | undefined;
            expires?: string | undefined;
            getIcon?: unknown;
            getId?: string | undefined;
            getObjSize?: string | undefined;
            getPath?: string | undefined;
            getRemoteUrl?: unknown;
            getURL?: string | undefined;
            hasPreviewImage?: unknown;
            head_title?: unknown;
            image_field?: string | null | undefined;
            image_scales?: unknown;
            in_response_to?: unknown;
            is_folderish?: boolean | undefined;
            last_comment_date?: unknown;
            listCreators?: string[] | undefined;
            mime_type?: string | undefined;
            modified?: string | undefined;
            nav_title?: unknown;
            portal_type?: string | undefined;
            review_state?: string | undefined;
            start?: unknown;
            sync_uid?: unknown;
            total_comments?: number | undefined;
        }>, "many">>>;
        rights: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        table_of_contents: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
        title: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        versioning_enabled: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        id?: string | null | undefined;
        description?: string | undefined;
        effective?: string | null | undefined;
        exclude_from_nav?: boolean | undefined;
        expires?: string | null | undefined;
        title?: string | undefined;
        allow_discussion?: boolean | undefined;
        blocks?: unknown;
        blocks_layout?: {
            items: string[];
        } | undefined;
        contributors?: string[] | undefined;
        creators?: string[] | undefined;
        preview_caption?: string | null | undefined;
        preview_image?: {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        } | null | undefined;
        relatedItems?: {
            "@id": string;
            title: string;
            location?: unknown;
            id?: string | undefined;
            "@type"?: string | undefined;
            CreationDate?: string | undefined;
            Creator?: string | undefined;
            Date?: string | undefined;
            Description?: string | undefined;
            EffectiveDate?: unknown;
            ExpirationDate?: unknown;
            ModificationDate?: string | undefined;
            Subject?: unknown[] | undefined;
            Title?: string | undefined;
            Type?: string | undefined;
            UID?: string | undefined;
            author_name?: unknown;
            cmf_uid?: unknown;
            commentators?: unknown[] | undefined;
            created?: string | undefined;
            description?: string | undefined;
            effective?: string | undefined;
            end?: unknown;
            exclude_from_nav?: boolean | undefined;
            expires?: string | undefined;
            getIcon?: unknown;
            getId?: string | undefined;
            getObjSize?: string | undefined;
            getPath?: string | undefined;
            getRemoteUrl?: unknown;
            getURL?: string | undefined;
            hasPreviewImage?: unknown;
            head_title?: unknown;
            image_field?: string | null | undefined;
            image_scales?: unknown;
            in_response_to?: unknown;
            is_folderish?: boolean | undefined;
            last_comment_date?: unknown;
            listCreators?: string[] | undefined;
            mime_type?: string | undefined;
            modified?: string | undefined;
            nav_title?: unknown;
            portal_type?: string | undefined;
            review_state?: string | undefined;
            start?: unknown;
            sync_uid?: unknown;
            total_comments?: number | undefined;
        }[] | undefined;
        rights?: string | null | undefined;
        versioning_enabled?: boolean | undefined;
        ordering?: {
            obj_id: string;
            delta: number | "bottom" | "top";
            subset_ids?: string[] | undefined;
        } | undefined;
        table_of_contents?: boolean | null | undefined;
    }, {
        id?: string | null | undefined;
        description?: string | undefined;
        effective?: string | null | undefined;
        exclude_from_nav?: boolean | undefined;
        expires?: string | null | undefined;
        title?: string | undefined;
        allow_discussion?: boolean | undefined;
        blocks?: unknown;
        blocks_layout?: {
            items: string[];
        } | undefined;
        contributors?: string[] | undefined;
        creators?: string[] | undefined;
        preview_caption?: string | null | undefined;
        preview_image?: {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        } | null | undefined;
        relatedItems?: {
            "@id": string;
            title: string;
            location?: unknown;
            id?: string | undefined;
            "@type"?: string | undefined;
            CreationDate?: string | undefined;
            Creator?: string | undefined;
            Date?: string | undefined;
            Description?: string | undefined;
            EffectiveDate?: unknown;
            ExpirationDate?: unknown;
            ModificationDate?: string | undefined;
            Subject?: unknown[] | undefined;
            Title?: string | undefined;
            Type?: string | undefined;
            UID?: string | undefined;
            author_name?: unknown;
            cmf_uid?: unknown;
            commentators?: unknown[] | undefined;
            created?: string | undefined;
            description?: string | undefined;
            effective?: string | undefined;
            end?: unknown;
            exclude_from_nav?: boolean | undefined;
            expires?: string | undefined;
            getIcon?: unknown;
            getId?: string | undefined;
            getObjSize?: string | undefined;
            getPath?: string | undefined;
            getRemoteUrl?: unknown;
            getURL?: string | undefined;
            hasPreviewImage?: unknown;
            head_title?: unknown;
            image_field?: string | null | undefined;
            image_scales?: unknown;
            in_response_to?: unknown;
            is_folderish?: boolean | undefined;
            last_comment_date?: unknown;
            listCreators?: string[] | undefined;
            mime_type?: string | undefined;
            modified?: string | undefined;
            nav_title?: unknown;
            portal_type?: string | undefined;
            review_state?: string | undefined;
            start?: unknown;
            sync_uid?: unknown;
            total_comments?: number | undefined;
        }[] | undefined;
        rights?: string | null | undefined;
        versioning_enabled?: boolean | undefined;
        ordering?: {
            obj_id: string;
            delta: number | "bottom" | "top";
            subset_ids?: string[] | undefined;
        } | undefined;
        table_of_contents?: boolean | null | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    path: string;
    data: {
        id?: string | null | undefined;
        description?: string | undefined;
        effective?: string | null | undefined;
        exclude_from_nav?: boolean | undefined;
        expires?: string | null | undefined;
        title?: string | undefined;
        allow_discussion?: boolean | undefined;
        blocks?: unknown;
        blocks_layout?: {
            items: string[];
        } | undefined;
        contributors?: string[] | undefined;
        creators?: string[] | undefined;
        preview_caption?: string | null | undefined;
        preview_image?: {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        } | null | undefined;
        relatedItems?: {
            "@id": string;
            title: string;
            location?: unknown;
            id?: string | undefined;
            "@type"?: string | undefined;
            CreationDate?: string | undefined;
            Creator?: string | undefined;
            Date?: string | undefined;
            Description?: string | undefined;
            EffectiveDate?: unknown;
            ExpirationDate?: unknown;
            ModificationDate?: string | undefined;
            Subject?: unknown[] | undefined;
            Title?: string | undefined;
            Type?: string | undefined;
            UID?: string | undefined;
            author_name?: unknown;
            cmf_uid?: unknown;
            commentators?: unknown[] | undefined;
            created?: string | undefined;
            description?: string | undefined;
            effective?: string | undefined;
            end?: unknown;
            exclude_from_nav?: boolean | undefined;
            expires?: string | undefined;
            getIcon?: unknown;
            getId?: string | undefined;
            getObjSize?: string | undefined;
            getPath?: string | undefined;
            getRemoteUrl?: unknown;
            getURL?: string | undefined;
            hasPreviewImage?: unknown;
            head_title?: unknown;
            image_field?: string | null | undefined;
            image_scales?: unknown;
            in_response_to?: unknown;
            is_folderish?: boolean | undefined;
            last_comment_date?: unknown;
            listCreators?: string[] | undefined;
            mime_type?: string | undefined;
            modified?: string | undefined;
            nav_title?: unknown;
            portal_type?: string | undefined;
            review_state?: string | undefined;
            start?: unknown;
            sync_uid?: unknown;
            total_comments?: number | undefined;
        }[] | undefined;
        rights?: string | null | undefined;
        versioning_enabled?: boolean | undefined;
        ordering?: {
            obj_id: string;
            delta: number | "bottom" | "top";
            subset_ids?: string[] | undefined;
        } | undefined;
        table_of_contents?: boolean | null | undefined;
    };
}, {
    path: string;
    data: {
        id?: string | null | undefined;
        description?: string | undefined;
        effective?: string | null | undefined;
        exclude_from_nav?: boolean | undefined;
        expires?: string | null | undefined;
        title?: string | undefined;
        allow_discussion?: boolean | undefined;
        blocks?: unknown;
        blocks_layout?: {
            items: string[];
        } | undefined;
        contributors?: string[] | undefined;
        creators?: string[] | undefined;
        preview_caption?: string | null | undefined;
        preview_image?: {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
        } | null | undefined;
        relatedItems?: {
            "@id": string;
            title: string;
            location?: unknown;
            id?: string | undefined;
            "@type"?: string | undefined;
            CreationDate?: string | undefined;
            Creator?: string | undefined;
            Date?: string | undefined;
            Description?: string | undefined;
            EffectiveDate?: unknown;
            ExpirationDate?: unknown;
            ModificationDate?: string | undefined;
            Subject?: unknown[] | undefined;
            Title?: string | undefined;
            Type?: string | undefined;
            UID?: string | undefined;
            author_name?: unknown;
            cmf_uid?: unknown;
            commentators?: unknown[] | undefined;
            created?: string | undefined;
            description?: string | undefined;
            effective?: string | undefined;
            end?: unknown;
            exclude_from_nav?: boolean | undefined;
            expires?: string | undefined;
            getIcon?: unknown;
            getId?: string | undefined;
            getObjSize?: string | undefined;
            getPath?: string | undefined;
            getRemoteUrl?: unknown;
            getURL?: string | undefined;
            hasPreviewImage?: unknown;
            head_title?: unknown;
            image_field?: string | null | undefined;
            image_scales?: unknown;
            in_response_to?: unknown;
            is_folderish?: boolean | undefined;
            last_comment_date?: unknown;
            listCreators?: string[] | undefined;
            mime_type?: string | undefined;
            modified?: string | undefined;
            nav_title?: unknown;
            portal_type?: string | undefined;
            review_state?: string | undefined;
            start?: unknown;
            sync_uid?: unknown;
            total_comments?: number | undefined;
        }[] | undefined;
        rights?: string | null | undefined;
        versioning_enabled?: boolean | undefined;
        ordering?: {
            obj_id: string;
            delta: number | "bottom" | "top";
            subset_ids?: string[] | undefined;
        } | undefined;
        table_of_contents?: boolean | null | undefined;
    };
}>;
type UpdateContentArgs = z.infer<typeof updateContentArgsSchema>;
declare function updateContent(this: PloneClient, { path, data }: UpdateContentArgs): Promise<RequestResponse<UpdateContentResponse>>;

declare const deleteContentArgsSchema: z.ZodObject<{
    path: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>;
type DeleteContentArgs = z.infer<typeof deleteContentArgsSchema>;
declare function deleteContent(this: PloneClient, { path }: DeleteContentArgs): Promise<RequestResponse<undefined>>;

declare const copyMoveContentDataSchema: z.ZodObject<{
    path: z.ZodString;
    data: z.ZodObject<{
        source: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
    }, "strip", z.ZodTypeAny, {
        source: string | string[];
    }, {
        source: string | string[];
    }>;
}, "strip", z.ZodTypeAny, {
    path: string;
    data: {
        source: string | string[];
    };
}, {
    path: string;
    data: {
        source: string | string[];
    };
}>;

type CopyArgs = z.infer<typeof copyMoveContentDataSchema>;
declare function copyContent(this: PloneClient, { path, data }: CopyArgs): Promise<RequestResponse<CopyMoveContentResponse>>;

type MoveArgs = z.infer<typeof copyMoveContentDataSchema>;
declare function moveContent(this: PloneClient, { path, data }: MoveArgs): Promise<RequestResponse<CopyMoveContentResponse>>;

declare const getContextNavigationSchema: z.ZodObject<{
    path: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>;
type ContextNavigationArgs = z.infer<typeof getContextNavigationSchema>;
declare function getContextNavigation(this: PloneClient, { path }: ContextNavigationArgs): Promise<RequestResponse<ContextNavigationResponse>>;

declare function getControlpanels(this: PloneClient): Promise<RequestResponse<GetControlpanelsResponse>>;

declare const getControlpanelSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type ControlpanelArgs = z.infer<typeof getControlpanelSchema>;
declare function getControlpanel(this: PloneClient, { id }: ControlpanelArgs): Promise<RequestResponse<GetControlpanelResponse>>;

declare const createControlpanelArgsSchema: z.ZodObject<{
    path: z.ZodString;
    data: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    path: string;
    data?: any;
}, {
    path: string;
    data?: any;
}>;
type CreateControlpanelArgs = z.infer<typeof createControlpanelArgsSchema>;
declare function createControlpanel(this: PloneClient, { path, data }: CreateControlpanelArgs): Promise<RequestResponse<any>>;

declare const updateControlpanelArgsSchema: z.ZodObject<{
    path: z.ZodString;
    data: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    path: string;
    data?: any;
}, {
    path: string;
    data?: any;
}>;
type UpdateControlpanelArgs = z.infer<typeof updateControlpanelArgsSchema>;
declare function updateControlpanel(this: PloneClient, { path, data }: UpdateControlpanelArgs): Promise<RequestResponse<any>>;

declare const deleteControlpanelArgsSchema: z.ZodObject<{
    path: z.ZodString;
    data: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    path: string;
    data?: any;
}, {
    path: string;
    data?: any;
}>;
type DeleteControlpanelArgs = z.infer<typeof deleteControlpanelArgsSchema>;
declare function deleteControlpanel(this: PloneClient, { path, data }: DeleteControlpanelArgs): Promise<RequestResponse<any>>;

declare function getDatabase(this: PloneClient): Promise<RequestResponse<DatabaseResponse>>;

declare const emailNotificationArgsSchema: z.ZodObject<{
    user: z.ZodOptional<z.ZodString>;
    data: z.ZodObject<{
        name: z.ZodString;
        from: z.ZodString;
        subject: z.ZodString;
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
        name: string;
        from: string;
        subject: string;
    }, {
        message: string;
        name: string;
        from: string;
        subject: string;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        message: string;
        name: string;
        from: string;
        subject: string;
    };
    user?: string | undefined;
}, {
    data: {
        message: string;
        name: string;
        from: string;
        subject: string;
    };
    user?: string | undefined;
}>;
type EmailNotificationArgs = z.infer<typeof emailNotificationArgsSchema>;
declare function emailNotification(this: PloneClient, { user, data }: EmailNotificationArgs): Promise<RequestResponse<undefined>>;

declare const emailSendArgsSchema: z.ZodObject<{
    data: z.ZodObject<{
        name: z.ZodString;
        from: z.ZodString;
        to: z.ZodString;
        subject: z.ZodString;
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
        name: string;
        from: string;
        subject: string;
        to: string;
    }, {
        message: string;
        name: string;
        from: string;
        subject: string;
        to: string;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        message: string;
        name: string;
        from: string;
        subject: string;
        to: string;
    };
}, {
    data: {
        message: string;
        name: string;
        from: string;
        subject: string;
        to: string;
    };
}>;
type EmailSendArgs = z.infer<typeof emailSendArgsSchema>;
declare function emailSend(this: PloneClient, { data }: EmailSendArgs): Promise<RequestResponse<undefined>>;

declare function getGroups(this: PloneClient): Promise<RequestResponse<GetGroupsResponse>>;

declare const getGroupSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type GroupArgs = z.infer<typeof getGroupSchema>;
declare function getGroup(this: PloneClient, { id }: GroupArgs): Promise<RequestResponse<GetGroupResponse>>;

declare const createGroupArgsSchema: z.ZodObject<{
    data: z.ZodObject<{
        description: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        groupname: z.ZodString;
        groups: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        title: z.ZodOptional<z.ZodString>;
        users: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        groupname: string;
        description?: string | undefined;
        title?: string | undefined;
        email?: string | undefined;
        groups?: string[] | undefined;
        roles?: string[] | undefined;
        users?: string[] | undefined;
    }, {
        groupname: string;
        description?: string | undefined;
        title?: string | undefined;
        email?: string | undefined;
        groups?: string[] | undefined;
        roles?: string[] | undefined;
        users?: string[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        groupname: string;
        description?: string | undefined;
        title?: string | undefined;
        email?: string | undefined;
        groups?: string[] | undefined;
        roles?: string[] | undefined;
        users?: string[] | undefined;
    };
}, {
    data: {
        groupname: string;
        description?: string | undefined;
        title?: string | undefined;
        email?: string | undefined;
        groups?: string[] | undefined;
        roles?: string[] | undefined;
        users?: string[] | undefined;
    };
}>;
type CreateGroupArgs = z.infer<typeof createGroupArgsSchema>;
declare function createGroup(this: PloneClient, { data }: CreateGroupArgs): Promise<RequestResponse<CreateGroupResponse>>;

declare const updateGroupArgsSchema: z.ZodObject<{
    id: z.ZodString;
    data: z.ZodObject<{
        description: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        title: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        title?: string | undefined;
        email?: string | undefined;
    }, {
        description?: string | undefined;
        title?: string | undefined;
        email?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        description?: string | undefined;
        title?: string | undefined;
        email?: string | undefined;
    };
    id: string;
}, {
    data: {
        description?: string | undefined;
        title?: string | undefined;
        email?: string | undefined;
    };
    id: string;
}>;
type UpdateGroupArgs = z.infer<typeof updateGroupArgsSchema>;
declare function updateGroup(this: PloneClient, { id, data }: UpdateGroupArgs): Promise<RequestResponse<undefined>>;

declare const deleteGroupArgsSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type DeleteGroupArgs = z.infer<typeof deleteGroupArgsSchema>;
declare function deleteGroup(this: PloneClient, { id }: DeleteGroupArgs): Promise<RequestResponse<undefined>>;

declare const getHistorySchema: z.ZodObject<{
    path: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>;
type HistoryArgs = z.infer<typeof getHistorySchema> & {};
declare function getHistory(this: PloneClient, { path }: HistoryArgs): Promise<RequestResponse<GetHistoryResponse>>;

declare const getHistoryVersionSchema: z.ZodObject<{
    path: z.ZodString;
    version: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    path: string;
    version: number;
}, {
    path: string;
    version: number;
}>;
type HistoryVersionArgs = z.infer<typeof getHistoryVersionSchema>;
declare function getHistoryVersion(this: PloneClient, { path, version }: HistoryVersionArgs): Promise<RequestResponse<unknown>>;

declare const revertHistoryArgsSchema: z.ZodObject<{
    path: z.ZodString;
    data: z.ZodObject<{
        version: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        version: number;
    }, {
        version: number;
    }>;
}, "strip", z.ZodTypeAny, {
    path: string;
    data: {
        version: number;
    };
}, {
    path: string;
    data: {
        version: number;
    };
}>;
type ReverHistoryArgs = z.infer<typeof revertHistoryArgsSchema>;
declare function revertHistory(this: PloneClient, { path, data }: ReverHistoryArgs): Promise<RequestResponse<undefined>>;

declare const getLinkintegriyArgsSchema: z.ZodObject<{
    uids: z.ZodString;
}, "strip", z.ZodTypeAny, {
    uids: string;
}, {
    uids: string;
}>;
type GetLinkintegrityArgs = z.infer<typeof getLinkintegriyArgsSchema>;
declare function getLinkintegrity(this: PloneClient, { uids }: GetLinkintegrityArgs): Promise<RequestResponse<any>>;

declare const getLockSchema: z.ZodObject<{
    path: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>;
type LockArgs = z.infer<typeof getLockSchema>;
declare function getLock(this: PloneClient, { path }: LockArgs): Promise<RequestResponse<LockInfo>>;

declare const createLockArgsSchema: z.ZodObject<{
    path: z.ZodString;
    data: z.ZodObject<{
        stealable: z.ZodOptional<z.ZodBoolean>;
        timeout: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        stealable?: boolean | undefined;
        timeout?: number | undefined;
    }, {
        stealable?: boolean | undefined;
        timeout?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    path: string;
    data: {
        stealable?: boolean | undefined;
        timeout?: number | undefined;
    };
}, {
    path: string;
    data: {
        stealable?: boolean | undefined;
        timeout?: number | undefined;
    };
}>;
type CreateLockArgs = z.infer<typeof createLockArgsSchema>;
declare function createLock(this: PloneClient, { path, data }: CreateLockArgs): Promise<RequestResponse<CreateLockResponse>>;

declare const updateLockArgsSchema: z.ZodObject<{
    path: z.ZodString;
    locktoken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
    locktoken: string;
}, {
    path: string;
    locktoken: string;
}>;
type UpdateLockArgs = z.infer<typeof updateLockArgsSchema>;
declare function updateLock(this: PloneClient, { path, locktoken }: UpdateLockArgs): Promise<RequestResponse<undefined>>;

declare const deleteLockArgsSchema: z.ZodObject<{
    path: z.ZodString;
    data: z.ZodOptional<z.ZodObject<{
        force: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        force?: boolean | undefined;
    }, {
        force?: boolean | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    path: string;
    data?: {
        force?: boolean | undefined;
    } | undefined;
}, {
    path: string;
    data?: {
        force?: boolean | undefined;
    } | undefined;
}>;
type DeleteLockArgs = z.infer<typeof deleteLockArgsSchema>;
declare function deleteLock(this: PloneClient, { path, data }: DeleteLockArgs): Promise<RequestResponse<LockInfo>>;

declare const loginArgsSchema: z.ZodObject<{
    data: z.ZodObject<{
        login: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        login: string;
        password: string;
    }, {
        login: string;
        password: string;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        login: string;
        password: string;
    };
}, {
    data: {
        login: string;
        password: string;
    };
}>;
type LoginArgs = z.infer<typeof loginArgsSchema>;
declare function login(this: PloneClient, { data }: LoginArgs): Promise<RequestResponse<Login>>;

declare const getNavigationSchema: z.ZodObject<{
    path: z.ZodString;
    depth: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    path: string;
    depth?: number | undefined;
}, {
    path: string;
    depth?: number | undefined;
}>;
type NavigationArgs = z.infer<typeof getNavigationSchema>;
declare function getNavigation(this: PloneClient, { path, depth }: NavigationArgs): Promise<RequestResponse<NavigationResponse>>;

declare const getNavrootSchema: z.ZodObject<{
    path: z.ZodString;
    language: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    path: string;
    language?: string | undefined;
}, {
    path: string;
    language?: string | undefined;
}>;
type NavrootArgs = z.infer<typeof getNavrootSchema>;
declare function getNavroot(this: PloneClient, { path, language }: NavrootArgs): Promise<RequestResponse<GetNavrootResponse>>;

declare const getPrincipalsSchema: z.ZodObject<{
    search: z.ZodString;
}, "strip", z.ZodTypeAny, {
    search: string;
}, {
    search: string;
}>;
type PrincipalsArgs = z.infer<typeof getPrincipalsSchema>;
declare function getPrincipals(this: PloneClient, { search }: PrincipalsArgs): Promise<RequestResponse<GetPrincipalsResponse>>;

declare const getQuerysourcesSchema: z.ZodObject<{
    path: z.ZodString;
    field: z.ZodString;
    query: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
    field: string;
    query: string;
}, {
    path: string;
    field: string;
    query: string;
}>;
type QuerysourcesArgs = z.infer<typeof getQuerysourcesSchema>;
declare function getQuerysources(this: PloneClient, { path, field, query }: QuerysourcesArgs): Promise<RequestResponse<GetQuerysourcesResponse>>;

declare function getQuerystring(this: PloneClient): Promise<RequestResponse<GetQuerystringResponse>>;

declare const querystringSearchDataSchema: z.ZodObject<{
    b_start: z.ZodOptional<z.ZodString>;
    b_size: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
    sort_on: z.ZodOptional<z.ZodString>;
    sort_order: z.ZodOptional<z.ZodString>;
    fullobjects: z.ZodOptional<z.ZodBoolean>;
    query: z.ZodArray<z.ZodObject<{
        i: z.ZodString;
        o: z.ZodString;
        v: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
    }, "strip", z.ZodTypeAny, {
        i: string;
        o: string;
        v: string | string[];
    }, {
        i: string;
        o: string;
        v: string | string[];
    }>, "many">;
    post: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    query: {
        i: string;
        o: string;
        v: string | string[];
    }[];
    post?: boolean | undefined;
    b_start?: string | undefined;
    b_size?: string | undefined;
    limit?: string | undefined;
    sort_on?: string | undefined;
    sort_order?: string | undefined;
    fullobjects?: boolean | undefined;
}, {
    query: {
        i: string;
        o: string;
        v: string | string[];
    }[];
    post?: boolean | undefined;
    b_start?: string | undefined;
    b_size?: string | undefined;
    limit?: string | undefined;
    sort_on?: string | undefined;
    sort_order?: string | undefined;
    fullobjects?: boolean | undefined;
}>;

type QuerystringSearchArgs = z.infer<typeof querystringSearchDataSchema>;
declare function querystringSearch(this: PloneClient, { query, post }: QuerystringSearchArgs): Promise<RequestResponse<QuerystringSearchResponse>>;

declare function getRegistry(this: PloneClient): Promise<RequestResponse<GetRegistryResponse>>;

declare const getRegistryRecordSchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
type GetRegistryArgs = z.infer<typeof getRegistryRecordSchema>;
declare function getRegistryRecord(this: PloneClient, { name }: GetRegistryArgs): Promise<RequestResponse<string>>;

declare const updateRegistryArgsSchema: z.ZodObject<{
    data: z.ZodRecord<z.ZodString, z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    data: Record<string, any>;
}, {
    data: Record<string, any>;
}>;
type UpdateRegistryArgs = z.infer<typeof updateRegistryArgsSchema>;
declare function updateRegistry(this: PloneClient, { data }: UpdateRegistryArgs): Promise<RequestResponse<undefined>>;

declare function getAllRelations(this: PloneClient): Promise<RequestResponse<GetAllRelationsResponse>>;

declare const getRelationsSchema: z.ZodEffects<z.ZodObject<{
    source: z.ZodOptional<z.ZodString>;
    relation: z.ZodOptional<z.ZodString>;
    onlyBroken: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    source?: string | undefined;
    relation?: string | undefined;
    onlyBroken?: boolean | undefined;
}, {
    source?: string | undefined;
    relation?: string | undefined;
    onlyBroken?: boolean | undefined;
}>, {
    source?: string | undefined;
    relation?: string | undefined;
    onlyBroken?: boolean | undefined;
}, {
    source?: string | undefined;
    relation?: string | undefined;
    onlyBroken?: boolean | undefined;
}>;
type RelationsArgs = z.infer<typeof getRelationsSchema>;
declare function getRelations(this: PloneClient, { source, relation, onlyBroken }: RelationsArgs): Promise<RequestResponse<GetRelationsResponse>>;

declare const createRelationsArgsSchema: z.ZodObject<{
    data: z.ZodObject<{
        items: z.ZodArray<z.ZodObject<{
            relation: z.ZodString;
            source: z.ZodString;
            target: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            source: string;
            relation: string;
            target: string;
        }, {
            source: string;
            relation: string;
            target: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        items: {
            source: string;
            relation: string;
            target: string;
        }[];
    }, {
        items: {
            source: string;
            relation: string;
            target: string;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        items: {
            source: string;
            relation: string;
            target: string;
        }[];
    };
}, {
    data: {
        items: {
            source: string;
            relation: string;
            target: string;
        }[];
    };
}>;
type CreateRelationsArgs = z.infer<typeof createRelationsArgsSchema>;
declare function createRelations(this: PloneClient, { data }: CreateRelationsArgs): Promise<RequestResponse<undefined>>;

declare const fixRelationsArgsSchema: z.ZodObject<{
    data: z.ZodOptional<z.ZodObject<{
        flush: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        flush?: number | undefined;
    }, {
        flush?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    data?: {
        flush?: number | undefined;
    } | undefined;
}, {
    data?: {
        flush?: number | undefined;
    } | undefined;
}>;
type FixRelationsArgs = z.infer<typeof fixRelationsArgsSchema>;
declare function fixRelations(this: PloneClient, { data }: FixRelationsArgs): Promise<RequestResponse<undefined>>;

declare const deleteRelationsArgsSchema: z.ZodObject<{
    data: z.ZodObject<{
        items: z.ZodOptional<z.ZodArray<z.ZodObject<{
            relation: z.ZodString;
            source: z.ZodString;
            target: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            source: string;
            relation: string;
            target: string;
        }, {
            source: string;
            relation: string;
            target: string;
        }>, "many">>;
        relation: z.ZodOptional<z.ZodString>;
        source: z.ZodOptional<z.ZodString>;
        target: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        items?: {
            source: string;
            relation: string;
            target: string;
        }[] | undefined;
        source?: string | undefined;
        relation?: string | undefined;
        target?: string | undefined;
    }, {
        items?: {
            source: string;
            relation: string;
            target: string;
        }[] | undefined;
        source?: string | undefined;
        relation?: string | undefined;
        target?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        items?: {
            source: string;
            relation: string;
            target: string;
        }[] | undefined;
        source?: string | undefined;
        relation?: string | undefined;
        target?: string | undefined;
    };
}, {
    data: {
        items?: {
            source: string;
            relation: string;
            target: string;
        }[] | undefined;
        source?: string | undefined;
        relation?: string | undefined;
        target?: string | undefined;
    };
}>;
type DeleteRelationsArgs = z.infer<typeof deleteRelationsArgsSchema>;
declare function deleteRelations(this: PloneClient, { data }: DeleteRelationsArgs): Promise<RequestResponse<undefined>>;

declare function getRoles(this: PloneClient): Promise<RequestResponse<GetRolesResponse>>;

declare function getRules(this: PloneClient): Promise<RequestResponse<GetRulesResponse>>;

declare const createRuleArgsSchema: z.ZodObject<{
    ruleId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    ruleId: string;
}, {
    ruleId: string;
}>;
type CreateRuleArgs = z.infer<typeof createRuleArgsSchema>;
declare function createRule(this: PloneClient, { ruleId }: CreateRuleArgs): Promise<RequestResponse<RuleRespose>>;

declare const updateRulesArgsSchema: z.ZodObject<{
    data: z.ZodObject<{
        'form.button.Bubble': z.ZodOptional<z.ZodBoolean>;
        'form.button.NoBubble': z.ZodOptional<z.ZodBoolean>;
        'form.button.Enable': z.ZodOptional<z.ZodBoolean>;
        'form.button.Disable': z.ZodOptional<z.ZodBoolean>;
        rules_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        operation: z.ZodOptional<z.ZodString>;
        rule_id: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        'form.button.Bubble'?: boolean | undefined;
        'form.button.NoBubble'?: boolean | undefined;
        'form.button.Enable'?: boolean | undefined;
        'form.button.Disable'?: boolean | undefined;
        rules_ids?: string[] | undefined;
        operation?: string | undefined;
        rule_id?: string | undefined;
    }, {
        'form.button.Bubble'?: boolean | undefined;
        'form.button.NoBubble'?: boolean | undefined;
        'form.button.Enable'?: boolean | undefined;
        'form.button.Disable'?: boolean | undefined;
        rules_ids?: string[] | undefined;
        operation?: string | undefined;
        rule_id?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        'form.button.Bubble'?: boolean | undefined;
        'form.button.NoBubble'?: boolean | undefined;
        'form.button.Enable'?: boolean | undefined;
        'form.button.Disable'?: boolean | undefined;
        rules_ids?: string[] | undefined;
        operation?: string | undefined;
        rule_id?: string | undefined;
    };
}, {
    data: {
        'form.button.Bubble'?: boolean | undefined;
        'form.button.NoBubble'?: boolean | undefined;
        'form.button.Enable'?: boolean | undefined;
        'form.button.Disable'?: boolean | undefined;
        rules_ids?: string[] | undefined;
        operation?: string | undefined;
        rule_id?: string | undefined;
    };
}>;
type UpdateRulesArgs = z.infer<typeof updateRulesArgsSchema>;
declare function updateRules(this: PloneClient, { data }: UpdateRulesArgs): Promise<RequestResponse<RuleRespose>>;

declare const deleteRulesArgsSchema: z.ZodObject<{
    data: z.ZodObject<{
        rules_ids: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        rules_ids: string[];
    }, {
        rules_ids: string[];
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        rules_ids: string[];
    };
}, {
    data: {
        rules_ids: string[];
    };
}>;
type DeleteRulesArgs = z.infer<typeof deleteRulesArgsSchema>;
declare function deleteRules(this: PloneClient, { data }: DeleteRulesArgs): Promise<RequestResponse<undefined>>;

declare const searchSchema: z.ZodObject<{
    query: z.ZodIntersection<z.ZodObject<{
        path: z.ZodOptional<z.ZodObject<{
            query: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
            depth: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            query: string | string[];
            depth?: number | undefined;
        }, {
            query: string | string[];
            depth?: number | undefined;
        }>>;
        sort_on: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        SearchableText: z.ZodOptional<z.ZodString>;
        metadata_fields: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        fullobjects: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        path?: {
            query: string | string[];
            depth?: number | undefined;
        } | undefined;
        sort_on?: string | string[] | undefined;
        fullobjects?: number | undefined;
        SearchableText?: string | undefined;
        metadata_fields?: string | string[] | undefined;
    }, {
        path?: {
            query: string | string[];
            depth?: number | undefined;
        } | undefined;
        sort_on?: string | string[] | undefined;
        fullobjects?: number | undefined;
        SearchableText?: string | undefined;
        metadata_fields?: string | string[] | undefined;
    }>, z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    query: {
        path?: {
            query: string | string[];
            depth?: number | undefined;
        } | undefined;
        sort_on?: string | string[] | undefined;
        fullobjects?: number | undefined;
        SearchableText?: string | undefined;
        metadata_fields?: string | string[] | undefined;
    } & Record<string, any>;
}, {
    query: {
        path?: {
            query: string | string[];
            depth?: number | undefined;
        } | undefined;
        sort_on?: string | string[] | undefined;
        fullobjects?: number | undefined;
        SearchableText?: string | undefined;
        metadata_fields?: string | string[] | undefined;
    } & Record<string, any>;
}>;

type SearchArgs = z.infer<typeof searchSchema>;
declare function search(this: PloneClient, { query }: SearchArgs): Promise<RequestResponse<SearchResponse>>;

declare function getSite(this: PloneClient): Promise<RequestResponse<GetSiteResponse>>;

declare const getSourceSchema: z.ZodObject<{
    path: z.ZodString;
    field: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
    field: string;
}, {
    path: string;
    field: string;
}>;
type SourceArgs = z.infer<typeof getSourceSchema>;
declare function getSource(this: PloneClient, { path, field }: SourceArgs): Promise<RequestResponse<GetSourceResponse>>;

declare function getSystem(this: PloneClient): Promise<RequestResponse<GetSystemResponse>>;

declare function getTransactions(this: PloneClient): Promise<RequestResponse<GetTransactionsResponse>>;

declare const revertTransactionsArgsSchema: z.ZodObject<{
    data: z.ZodObject<{
        transaction_ids: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        transaction_ids: string[];
    }, {
        transaction_ids: string[];
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        transaction_ids: string[];
    };
}, {
    data: {
        transaction_ids: string[];
    };
}>;
type RevertTransactionsArgs = z.infer<typeof revertTransactionsArgsSchema>;
declare function revertTransactions(this: PloneClient, { data }: RevertTransactionsArgs): Promise<RequestResponse<RevertTransactionsResponse>>;

declare const getTranslationSchema: z.ZodObject<{
    path: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>;
type TranslationArgs = z.infer<typeof getTranslationSchema>;
declare function getTranslation(this: PloneClient, { path }: TranslationArgs): Promise<RequestResponse<GetTranslationResponse>>;

declare const linkTranslationArgsSchema: z.ZodObject<{
    path: z.ZodString;
    data: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    path: string;
    data: {
        id: string;
    };
}, {
    path: string;
    data: {
        id: string;
    };
}>;
type LinkTranslationArgs = z.infer<typeof linkTranslationArgsSchema>;
declare function linkTranslation(this: PloneClient, { path, data }: LinkTranslationArgs): Promise<RequestResponse<undefined>>;

declare const unlinkTranslationArgsSchema: z.ZodObject<{
    path: z.ZodString;
    data: z.ZodObject<{
        language: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        language: string;
    }, {
        language: string;
    }>;
}, "strip", z.ZodTypeAny, {
    path: string;
    data: {
        language: string;
    };
}, {
    path: string;
    data: {
        language: string;
    };
}>;
type UnlinkTranslationArgs = z.infer<typeof unlinkTranslationArgsSchema>;
declare function unlinkTranslation(this: PloneClient, { path, data }: UnlinkTranslationArgs): Promise<RequestResponse<undefined>>;

declare function getTypes(this: PloneClient): Promise<RequestResponse<GetTypesResponse>>;

declare const getTypeSchema: z.ZodObject<{
    type: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: string;
}, {
    type: string;
}>;
type GetTypeArgs = z.infer<typeof getTypeSchema>;
declare function getType(this: PloneClient, { type }: GetTypeArgs): Promise<RequestResponse<GetTypeResponse>>;

declare const getTypeFieldSchema: z.ZodObject<{
    contentFieldPath: z.ZodString;
}, "strip", z.ZodTypeAny, {
    contentFieldPath: string;
}, {
    contentFieldPath: string;
}>;
type GetTypeFieldArgs = z.infer<typeof getTypeFieldSchema> & {};
declare function getTypeField(this: PloneClient, { contentFieldPath }: GetTypeFieldArgs): Promise<RequestResponse<GetTypeFieldResponse>>;

declare const createTypeFieldArgsSchema: z.ZodObject<{
    contentPath: z.ZodString;
    data: z.ZodObject<{
        description: z.ZodString;
        factory: z.ZodString;
        required: z.ZodOptional<z.ZodBoolean>;
        title: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        description: string;
        title: string;
        factory: string;
        required?: boolean | undefined;
    }, {
        description: string;
        title: string;
        factory: string;
        required?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        description: string;
        title: string;
        factory: string;
        required?: boolean | undefined;
    };
    contentPath: string;
}, {
    data: {
        description: string;
        title: string;
        factory: string;
        required?: boolean | undefined;
    };
    contentPath: string;
}>;
type CreateTypeFieldArgs = z.infer<typeof createTypeFieldArgsSchema>;
declare function createTypeField(this: PloneClient, { contentPath, data }: CreateTypeFieldArgs): Promise<RequestResponse<CreateTypeFieldResponse>>;

declare const updateTypeFieldArgsSchema: z.ZodObject<{
    contentPath: z.ZodString;
    data: z.ZodObject<{
        description: z.ZodOptional<z.ZodString>;
        maxLength: z.ZodOptional<z.ZodNumber>;
        minLength: z.ZodOptional<z.ZodNumber>;
        fields: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        required: z.ZodOptional<z.ZodBoolean>;
        title: z.ZodOptional<z.ZodString>;
        properties: z.ZodOptional<z.ZodAny>;
        fieldsets: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    }, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        title?: string | undefined;
        required?: boolean | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        fields?: string[] | undefined;
        properties?: any;
        fieldsets?: any[] | undefined;
    }, {
        description?: string | undefined;
        title?: string | undefined;
        required?: boolean | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        fields?: string[] | undefined;
        properties?: any;
        fieldsets?: any[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        description?: string | undefined;
        title?: string | undefined;
        required?: boolean | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        fields?: string[] | undefined;
        properties?: any;
        fieldsets?: any[] | undefined;
    };
    contentPath: string;
}, {
    data: {
        description?: string | undefined;
        title?: string | undefined;
        required?: boolean | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        fields?: string[] | undefined;
        properties?: any;
        fieldsets?: any[] | undefined;
    };
    contentPath: string;
}>;
type UpdateTypeFieldArgs = z.infer<typeof updateTypeFieldArgsSchema>;
declare function updateTypeField(this: PloneClient, { contentPath, data }: UpdateTypeFieldArgs): Promise<RequestResponse<undefined>>;

declare function getUpgrade(this: PloneClient): Promise<RequestResponse<GetUpgradeResponse>>;

declare const runUpgradeArgsSchema: z.ZodObject<{
    data: z.ZodObject<{
        dry_run: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        dry_run: boolean;
    }, {
        dry_run: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        dry_run: boolean;
    };
}, {
    data: {
        dry_run: boolean;
    };
}>;
type RunUpgradeArgs = z.infer<typeof runUpgradeArgsSchema>;
declare function runUpgrade(this: PloneClient, { data }: RunUpgradeArgs): Promise<RequestResponse<RunUpgradeResponse>>;

declare const getUsersSchema: z.ZodObject<{
    query: z.ZodOptional<z.ZodString>;
    groupsFilter: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    search: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    search?: string | undefined;
    query?: string | undefined;
    limit?: number | undefined;
    groupsFilter?: string[] | undefined;
}, {
    search?: string | undefined;
    query?: string | undefined;
    limit?: number | undefined;
    groupsFilter?: string[] | undefined;
}>;
type GetUsersArgs = z.infer<typeof getUsersSchema>;
declare function getUsers(this: PloneClient, { query, groupsFilter, search, limit }: GetUsersArgs): Promise<RequestResponse<GetUsersResponse>>;

declare const getUserSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type UserArgs = z.infer<typeof getUserSchema>;
declare function getUser(this: PloneClient, { id }: UserArgs): Promise<RequestResponse<User>>;

declare const createUserArgsSchema: z.ZodObject<{
    data: z.ZodObject<{
        description: z.ZodOptional<z.ZodString>;
        email: z.ZodString;
        fullname: z.ZodOptional<z.ZodString>;
        home_page: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodString>;
        sendPasswordReset: z.ZodOptional<z.ZodBoolean>;
        username: z.ZodString;
        roles: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        password: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        username: string;
        location?: string | undefined;
        description?: string | undefined;
        roles?: string[] | undefined;
        password?: string | undefined;
        fullname?: string | undefined;
        home_page?: string | undefined;
        sendPasswordReset?: boolean | undefined;
    }, {
        email: string;
        username: string;
        location?: string | undefined;
        description?: string | undefined;
        roles?: string[] | undefined;
        password?: string | undefined;
        fullname?: string | undefined;
        home_page?: string | undefined;
        sendPasswordReset?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        email: string;
        username: string;
        location?: string | undefined;
        description?: string | undefined;
        roles?: string[] | undefined;
        password?: string | undefined;
        fullname?: string | undefined;
        home_page?: string | undefined;
        sendPasswordReset?: boolean | undefined;
    };
}, {
    data: {
        email: string;
        username: string;
        location?: string | undefined;
        description?: string | undefined;
        roles?: string[] | undefined;
        password?: string | undefined;
        fullname?: string | undefined;
        home_page?: string | undefined;
        sendPasswordReset?: boolean | undefined;
    };
}>;
type CreateUserArgs = z.infer<typeof createUserArgsSchema>;
declare function createUser(this: PloneClient, { data }: CreateUserArgs): Promise<RequestResponse<User>>;

declare const updateUserArgsSchema: z.ZodObject<{
    id: z.ZodString;
    data: z.ZodObject<{
        description: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        fullname: z.ZodOptional<z.ZodString>;
        home_page: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodString>;
        username: z.ZodOptional<z.ZodString>;
        portrait: z.ZodOptional<z.ZodObject<{
            'content-type': z.ZodString;
            data: z.ZodString;
            encoding: z.ZodString;
            filename: z.ZodString;
            scale: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
            scale?: boolean | undefined;
        }, {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
            scale?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        location?: string | undefined;
        description?: string | undefined;
        email?: string | undefined;
        fullname?: string | undefined;
        home_page?: string | undefined;
        username?: string | undefined;
        portrait?: {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
            scale?: boolean | undefined;
        } | undefined;
    }, {
        location?: string | undefined;
        description?: string | undefined;
        email?: string | undefined;
        fullname?: string | undefined;
        home_page?: string | undefined;
        username?: string | undefined;
        portrait?: {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
            scale?: boolean | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        location?: string | undefined;
        description?: string | undefined;
        email?: string | undefined;
        fullname?: string | undefined;
        home_page?: string | undefined;
        username?: string | undefined;
        portrait?: {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
            scale?: boolean | undefined;
        } | undefined;
    };
    id: string;
}, {
    data: {
        location?: string | undefined;
        description?: string | undefined;
        email?: string | undefined;
        fullname?: string | undefined;
        home_page?: string | undefined;
        username?: string | undefined;
        portrait?: {
            data: string;
            'content-type': string;
            encoding: string;
            filename: string;
            scale?: boolean | undefined;
        } | undefined;
    };
    id: string;
}>;
type UpdateUserArgs = z.infer<typeof updateUserArgsSchema>;
declare function updateUser(this: PloneClient, { id, data }: UpdateUserArgs): Promise<RequestResponse<undefined>>;

declare const deleteUserArgsSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type DeleteUserArgs = z.infer<typeof deleteUserArgsSchema>;
declare function deleteUser(this: PloneClient, { id }: DeleteUserArgs): Promise<RequestResponse<undefined>>;

declare const resetPasswordArgsSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type ResetUserArgs = z.infer<typeof resetPasswordArgsSchema>;
declare function resetPassword(this: PloneClient, { id }: ResetUserArgs): Promise<RequestResponse<undefined>>;

declare const resetPasswordWithTokenArgsSchema: z.ZodObject<{
    id: z.ZodString;
    data: z.ZodObject<{
        reset_token: z.ZodString;
        new_password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        reset_token: string;
        new_password: string;
    }, {
        reset_token: string;
        new_password: string;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        reset_token: string;
        new_password: string;
    };
    id: string;
}, {
    data: {
        reset_token: string;
        new_password: string;
    };
    id: string;
}>;
type ResetPasswordWithTokenUserArgs = z.infer<typeof resetPasswordWithTokenArgsSchema>;
declare function resetPasswordWithToken(this: PloneClient, { id, data }: ResetPasswordWithTokenUserArgs): Promise<RequestResponse<undefined>>;

declare const updatePasswordArgsSchema: z.ZodObject<{
    id: z.ZodString;
    data: z.ZodObject<{
        new_password: z.ZodString;
        old_password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        new_password: string;
        old_password: string;
    }, {
        new_password: string;
        old_password: string;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        new_password: string;
        old_password: string;
    };
    id: string;
}, {
    data: {
        new_password: string;
        old_password: string;
    };
    id: string;
}>;
type UpdatePasswordArgs = z.infer<typeof updatePasswordArgsSchema>;
declare function updatePassword(this: PloneClient, { id, data }: UpdatePasswordArgs): Promise<RequestResponse<undefined>>;

declare function getUserschema(this: PloneClient): Promise<RequestResponse<GetUserschemaResponse>>;

declare function getVocabularies(this: PloneClient): Promise<RequestResponse<GetVocabulariesResponse>>;

declare const getVocabularySchema: z.ZodObject<{
    path: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    token: z.ZodOptional<z.ZodString>;
    tokens: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    path: string;
    token?: string | undefined;
    title?: string | undefined;
    tokens?: string[] | undefined;
}, {
    path: string;
    token?: string | undefined;
    title?: string | undefined;
    tokens?: string[] | undefined;
}>;
type VocabulariesArgs = z.infer<typeof getVocabularySchema>;
declare function getVocabulary(this: PloneClient, { path, title, token, tokens }: VocabulariesArgs): Promise<RequestResponse<GetVocabularyResponse>>;

declare const getWorkflowSchema: z.ZodObject<{
    path: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>;
type WorkflowArgs = z.infer<typeof getWorkflowSchema>;
declare function getWorkflow(this: PloneClient, { path }: WorkflowArgs): Promise<RequestResponse<WorkflowResponse>>;

declare const createWorkflowArgsSchema: z.ZodObject<{
    path: z.ZodString;
    data: z.ZodOptional<z.ZodObject<{
        comment: z.ZodOptional<z.ZodString>;
        effective: z.ZodOptional<z.ZodString>;
        expires: z.ZodOptional<z.ZodString>;
        include_children: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        effective?: string | undefined;
        expires?: string | undefined;
        comment?: string | undefined;
        include_children?: boolean | undefined;
    }, {
        effective?: string | undefined;
        expires?: string | undefined;
        comment?: string | undefined;
        include_children?: boolean | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    path: string;
    data?: {
        effective?: string | undefined;
        expires?: string | undefined;
        comment?: string | undefined;
        include_children?: boolean | undefined;
    } | undefined;
}, {
    path: string;
    data?: {
        effective?: string | undefined;
        expires?: string | undefined;
        comment?: string | undefined;
        include_children?: boolean | undefined;
    } | undefined;
}>;
type CreateWorkflowArgs = z.infer<typeof createWorkflowArgsSchema>;
declare function createWorkflow(this: PloneClient, { path, data }: CreateWorkflowArgs): Promise<RequestResponse<CreateWorkflowResponse>>;

declare const getWorkingcopySchema: z.ZodObject<{
    path: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>;
type GetWorkingcopyArgs = z.infer<typeof getWorkingcopySchema>;
declare function getWorkingcopy(this: PloneClient, { path }: GetWorkingcopyArgs): Promise<RequestResponse<GetWorkingcopyResponse>>;

declare const createWorkingcopyArgsSchema: z.ZodObject<{
    path: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>;
type CreateWorkingcopyArgs = z.infer<typeof createWorkingcopyArgsSchema>;
declare function createWorkingcopy(this: PloneClient, { path }: CreateWorkingcopyArgs): Promise<RequestResponse<CreateWorkingcopyResponse>>;

declare const checkInWorkingcopyArgsSchema: z.ZodObject<{
    path: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>;
type CheckInWorkingcopyArgs = z.infer<typeof checkInWorkingcopyArgsSchema>;
declare function checkInWorkingcopy(this: PloneClient, { path }: CheckInWorkingcopyArgs): Promise<RequestResponse<undefined>>;

declare const deleteWorkingcopyArgsSchema: z.ZodObject<{
    path: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>;
type DeleteWorkingcopyArgs = z.infer<typeof deleteWorkingcopyArgsSchema>;
declare function deleteWorkingcopy(this: PloneClient, { path }: DeleteWorkingcopyArgs): Promise<RequestResponse<undefined>>;

declare const PloneClientConfigSchema: z.ZodObject<{
    apiPath: z.ZodString;
    apiSuffix: z.ZodOptional<z.ZodString>;
    token: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    apiPath: string;
    apiSuffix?: string | undefined;
    token?: string | undefined;
}, {
    apiPath: string;
    apiSuffix?: string | undefined;
    token?: string | undefined;
}>;
type PloneClientConfig = z.infer<typeof PloneClientConfigSchema>;

declare class PloneClient {
    config: PloneClientConfig;
    static initialize: (config: PloneClientConfig) => InstanceType<typeof PloneClient>;
    constructor(config: PloneClientConfig);
    getActions: typeof getActions;
    getAddons: typeof getAddons;
    getAddon: typeof getAddon;
    installAddon: typeof installAddon;
    uninstallAddon: typeof uninstallAddon;
    upgradeAddon: typeof upgradeAddon;
    installAddonProfile: typeof installAddonProfile;
    getAllAliases: typeof getAllAliases;
    getAliases: typeof getAliases;
    createAlias: typeof createAlias;
    createAliases: typeof createAliases;
    deleteAliases: typeof deleteAliases;
    getBreadcrumbs: typeof getBreadcrumbs;
    getComments: typeof getComments;
    createComment: typeof createComment;
    updateComment: typeof updateComment;
    deleteComment: typeof deleteComment;
    getContent: typeof getContent;
    createContent: typeof createContent;
    updateContent: typeof updateContent;
    deleteContent: typeof deleteContent;
    copyContent: typeof copyContent;
    moveContent: typeof moveContent;
    getContextNavigation: typeof getContextNavigation;
    getControlpanels: typeof getControlpanels;
    getControlpanel: typeof getControlpanel;
    createControlpanel: typeof createControlpanel;
    updateControlpanel: typeof updateControlpanel;
    deleteControlpanel: typeof deleteControlpanel;
    getDatabase: typeof getDatabase;
    emailNotification: typeof emailNotification;
    emailSend: typeof emailSend;
    getGroups: typeof getGroups;
    getGroup: typeof getGroup;
    createGroup: typeof createGroup;
    updateGroup: typeof updateGroup;
    deleteGroup: typeof deleteGroup;
    getHistory: typeof getHistory;
    getHistoryVersion: typeof getHistoryVersion;
    revertHistory: typeof revertHistory;
    getLinkintegrity: typeof getLinkintegrity;
    getLock: typeof getLock;
    createLock: typeof createLock;
    updateLock: typeof updateLock;
    deleteLock: typeof deleteLock;
    login: typeof login;
    getNavigation: typeof getNavigation;
    getNavroot: typeof getNavroot;
    getPrincipals: typeof getPrincipals;
    getQuerysources: typeof getQuerysources;
    getQuerystring: typeof getQuerystring;
    querystringSearch: typeof querystringSearch;
    getRegistry: typeof getRegistry;
    getRegistryRecord: typeof getRegistryRecord;
    updateRegistry: typeof updateRegistry;
    getAllRelations: typeof getAllRelations;
    getRelations: typeof getRelations;
    createRelations: typeof createRelations;
    fixRelations: typeof fixRelations;
    deleteRelations: typeof deleteRelations;
    getRoles: typeof getRoles;
    getRules: typeof getRules;
    createRule: typeof createRule;
    updateRules: typeof updateRules;
    deleteRules: typeof deleteRules;
    search: typeof search;
    getSite: typeof getSite;
    getSource: typeof getSource;
    getSystem: typeof getSystem;
    getTransactions: typeof getTransactions;
    revertTransactions: typeof revertTransactions;
    getTranslation: typeof getTranslation;
    linkTranslation: typeof linkTranslation;
    unlinkTranslation: typeof unlinkTranslation;
    getTypes: typeof getTypes;
    getType: typeof getType;
    getTypeField: typeof getTypeField;
    createTypeField: typeof createTypeField;
    updateTypeField: typeof updateTypeField;
    getUpgrade: typeof getUpgrade;
    runUpgrade: typeof runUpgrade;
    getUsers: typeof getUsers;
    getUser: typeof getUser;
    createUser: typeof createUser;
    updateUser: typeof updateUser;
    deleteUser: typeof deleteUser;
    resetPassword: typeof resetPassword;
    resetPasswordWithToken: typeof resetPasswordWithToken;
    updatePassword: typeof updatePassword;
    getUserschema: typeof getUserschema;
    getVocabularies: typeof getVocabularies;
    getVocabulary: typeof getVocabulary;
    getWorkflow: typeof getWorkflow;
    createWorkflow: typeof createWorkflow;
    getWorkingcopy: typeof getWorkingcopy;
    createWorkingcopy: typeof createWorkingcopy;
    checkInWorkingcopy: typeof checkInWorkingcopy;
    deleteWorkingcopy: typeof deleteWorkingcopy;
}

export { PloneClient as default };
