/**
 * Wrapper container class.
 * @class Wrapper
 * @extends Component
 */
export default class Wrapper extends Component<any, any, any> {
    /**
     * Property types.
     * @property {Object} propTypes Property types.
     * @static
     */
    static propTypes: {
        pathname: any;
        anonymous: any;
        customStore: any;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    customState(): {
        router: {
            location: {
                pathname: string;
                search: string;
                hash: string;
                key: string;
                query: {};
            };
            action: string;
        };
        intl: {
            defaultLocale: string;
            locale: string;
            messages: {};
        };
        reduxAsyncConnect: {
            loaded: boolean;
            loadState: {
                breadcrumbs: {
                    loading: boolean;
                    loaded: boolean;
                    error: any;
                };
                content: {
                    loading: boolean;
                    loaded: boolean;
                    error: any;
                };
                navigation: {
                    loading: boolean;
                    loaded: boolean;
                    error: any;
                };
                workflow: {
                    loading: boolean;
                    loaded: boolean;
                    error: any;
                };
            };
            breadcrumbs: {
                '@id': string;
                items: any[];
            };
            content: {
                '@components': {
                    actions: {
                        '@id': string;
                    };
                    breadcrumbs: {
                        '@id': string;
                    };
                    navigation: {
                        '@id': string;
                    };
                };
                '@id': string;
                '@type': string;
                blocks: {
                    '0358abe2-b4f1-463d-a279-a63ea80daf19': {
                        '@type': string;
                    };
                    '07c273fc-8bfc-4e7d-a327-d513e5a945bb': {
                        '@type': string;
                    };
                    '2dfe8e4c-5bf6-43f1-93e1-6c320ede7226': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: {
                                    length: number;
                                    offset: number;
                                    style: string;
                                }[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    '3c881f51-f75b-4959-834a-6e1d5edc32ae': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: {
                                    length: number;
                                    offset: number;
                                    style: string;
                                }[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    '5e1c30b1-ec6c-4dc0-9483-9768c3c416e4': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: {
                                    key: number;
                                    length: number;
                                    offset: number;
                                }[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {
                                0: {
                                    data: {
                                        href: string;
                                        rel: string;
                                        url: string;
                                    };
                                    mutability: string;
                                    type: string;
                                };
                                1: {
                                    data: {
                                        href: string;
                                        url: string;
                                    };
                                    mutability: string;
                                    type: string;
                                };
                            };
                        };
                    };
                    '61cc1bc0-d4f5-4e2b-9152-79512045a4dd': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    '874049e7-629e-489a-b46c-1adf35ad40ee': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    '942b6530-2407-420f-9c24-597adda6b2ce': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: {
                                    key: number;
                                    length: number;
                                    offset: number;
                                }[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {
                                0: {
                                    data: {
                                        href: string;
                                        url: string;
                                    };
                                    mutability: string;
                                    type: string;
                                };
                            };
                        };
                    };
                    '9a976b8e-72ba-468a-bea8-b37a31bb386b': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: {
                                    length: number;
                                    offset: number;
                                    style: string;
                                }[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    'b3717238-448f-406e-b06f-57a9715c3326': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: {
                                    key: number;
                                    length: number;
                                    offset: number;
                                }[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {
                                0: {
                                    data: {
                                        href: string;
                                        url: string;
                                    };
                                    mutability: string;
                                    type: string;
                                };
                            };
                        };
                    };
                    'c049ff8b-3e5a-4cfb-bca6-e4a6cca9be28': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    'c91f0fe9-f2e9-4a17-84a5-8e4f2678ed3c': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: {
                                    length: number;
                                    offset: number;
                                    style: string;
                                }[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    'e0ca2fbc-7800-4b9b-afe5-8e42af9f5dd6': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    'effbdcdc-253c-41a7-841e-5edb3b56ce32': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: {
                                    key: number;
                                    length: number;
                                    offset: number;
                                }[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {
                                0: {
                                    data: {
                                        href: string;
                                        rel: string;
                                        url: string;
                                    };
                                    mutability: string;
                                    type: string;
                                };
                            };
                        };
                    };
                };
                blocks_layout: {
                    items: string[];
                };
                description: string;
                id: string;
                is_folderish: boolean;
                items: {
                    '@id': string;
                    '@type': string;
                    description: string;
                    review_state: string;
                    title: string;
                }[];
                items_total: number;
                parent: {};
                title: string;
            };
            navigation: {
                '@id': string;
                items: {
                    '@id': string;
                    description: string;
                    title: string;
                }[];
            };
            workflow: {
                '@id': string;
                history: any[];
                transitions: any[];
            };
        };
        actions: {
            error: any;
            actions: {
                document_actions: any[];
                object: {
                    icon: string;
                    id: string;
                    title: string;
                }[];
                object_buttons: any[];
                portal_tabs: {
                    icon: string;
                    id: string;
                    title: string;
                }[];
                site_actions: {
                    icon: string;
                    id: string;
                    title: string;
                }[];
                user: {
                    icon: string;
                    id: string;
                    title: string;
                }[];
            };
            loaded: boolean;
            loading: boolean;
        };
        addons: {
            error: any;
            installedAddons: any[];
            availableAddons: any[];
            upgradableAddons: any[];
            loaded: boolean;
            loading: boolean;
        };
        apierror: {
            error: any;
            statusCode: any;
            connectionRefused: boolean;
            message: any;
        };
        breadcrumbs: {
            error: any;
            items: {
                title: string;
                url: string;
            }[];
            loaded: boolean;
            loading: boolean;
        };
        browserdetect: {
            name: string;
            version: string;
            os: string;
            type: string;
        };
        comments: {
            add: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            delete: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            update: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            list: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            items: any[];
        };
        content: {
            unlock: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            create: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            delete: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            update: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            get: {
                loading: boolean;
                loaded: boolean;
                error: any;
            };
            order: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            data: {
                '@components': {
                    actions: {
                        '@id': string;
                    };
                    breadcrumbs: {
                        '@id': string;
                    };
                    navigation: {
                        '@id': string;
                    };
                };
                '@id': string;
                '@type': string;
                blocks: {
                    '0358abe2-b4f1-463d-a279-a63ea80daf19': {
                        '@type': string;
                    };
                    '07c273fc-8bfc-4e7d-a327-d513e5a945bb': {
                        '@type': string;
                    };
                    '2dfe8e4c-5bf6-43f1-93e1-6c320ede7226': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: {
                                    length: number;
                                    offset: number;
                                    style: string;
                                }[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    '3c881f51-f75b-4959-834a-6e1d5edc32ae': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: {
                                    length: number;
                                    offset: number;
                                    style: string;
                                }[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    '5e1c30b1-ec6c-4dc0-9483-9768c3c416e4': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: {
                                    key: number;
                                    length: number;
                                    offset: number;
                                }[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {
                                0: {
                                    data: {
                                        href: string;
                                        rel: string;
                                        url: string;
                                    };
                                    mutability: string;
                                    type: string;
                                };
                                1: {
                                    data: {
                                        href: string;
                                        url: string;
                                    };
                                    mutability: string;
                                    type: string;
                                };
                            };
                        };
                    };
                    '61cc1bc0-d4f5-4e2b-9152-79512045a4dd': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    '874049e7-629e-489a-b46c-1adf35ad40ee': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    '942b6530-2407-420f-9c24-597adda6b2ce': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: {
                                    key: number;
                                    length: number;
                                    offset: number;
                                }[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {
                                0: {
                                    data: {
                                        href: string;
                                        url: string;
                                    };
                                    mutability: string;
                                    type: string;
                                };
                            };
                        };
                    };
                    '9a976b8e-72ba-468a-bea8-b37a31bb386b': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: {
                                    length: number;
                                    offset: number;
                                    style: string;
                                }[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    'b3717238-448f-406e-b06f-57a9715c3326': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: {
                                    key: number;
                                    length: number;
                                    offset: number;
                                }[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {
                                0: {
                                    data: {
                                        href: string;
                                        url: string;
                                    };
                                    mutability: string;
                                    type: string;
                                };
                            };
                        };
                    };
                    'c049ff8b-3e5a-4cfb-bca6-e4a6cca9be28': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    'c91f0fe9-f2e9-4a17-84a5-8e4f2678ed3c': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: {
                                    length: number;
                                    offset: number;
                                    style: string;
                                }[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    'e0ca2fbc-7800-4b9b-afe5-8e42af9f5dd6': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    'effbdcdc-253c-41a7-841e-5edb3b56ce32': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: {
                                    key: number;
                                    length: number;
                                    offset: number;
                                }[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {
                                0: {
                                    data: {
                                        href: string;
                                        rel: string;
                                        url: string;
                                    };
                                    mutability: string;
                                    type: string;
                                };
                            };
                        };
                    };
                };
                blocks_layout: {
                    items: string[];
                };
                description: string;
                id: string;
                is_folderish: boolean;
                items: {
                    '@id': string;
                    '@type': string;
                    description: string;
                    review_state: string;
                    title: string;
                    url: string;
                }[];
                items_total: number;
                parent: {};
                title: string;
            };
            subrequests: {};
        };
        controlpanels: {
            get: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            list: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            update: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            post: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            delete: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            controlpanel: any;
            controlpanels: any[];
            systeminformation: any;
            databaseinformation: any;
        };
        clipboard: {
            action: any;
            source: any;
            request: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
        };
        diff: {
            error: any;
            data: any[];
            loaded: boolean;
            loading: boolean;
        };
        emailNotification: {
            error: any;
            loaded: boolean;
            loading: boolean;
        };
        form: {};
        groups: {
            create: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            delete: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            get: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            list: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            update: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            groups: any[];
            group: {};
        };
        history: {
            entries: any[];
            get: {
                error: any;
                loaded: boolean;
                loading: boolean;
            };
            revert: {
                error: any;
                loaded: boolean;
                loading: boolean;
            };
        };
        messages: {
            messages: any[];
        };
        navigation: {
            error: any;
            items: {
                title: string;
                url: string;
            }[];
            loaded: boolean;
            loading: boolean;
        };
        querystring: {
            error: any;
            indexes: {};
            sortable_indexes: {};
            loaded: boolean;
            loading: boolean;
        };
        querystringsearch: {
            error: any;
            items: any[];
            total: number;
            loaded: boolean;
            loading: boolean;
            batching: {};
            subrequests: {};
        };
        roles: {
            error: any;
            roles: any[];
            loaded: boolean;
            loading: boolean;
        };
        schema: {
            error: any;
            loaded: boolean;
            loading: boolean;
            schema: any;
            post: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            update: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            put: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
        };
        search: {
            error: any;
            items: any[];
            total: number;
            loaded: boolean;
            loading: boolean;
            batching: {};
            subrequests: {};
        };
        sharing: {
            update: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            get: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            data: {
                available_roles: any[];
                entries: any[];
                inherit: any;
            };
        };
        sidebar: {
            tab: number;
        };
        types: {
            error: any;
            loaded: boolean;
            loading: boolean;
            types: {
                '@id': string;
                addable: boolean;
                title: string;
            }[];
        };
        users: {
            user: {};
            users: any[];
            create: {
                error: any;
                loaded: boolean;
                loading: boolean;
            };
            get: {
                error: any;
                loaded: boolean;
                loading: boolean;
            };
            list: {
                error: any;
                loaded: boolean;
                loading: boolean;
            };
            delete: {
                error: any;
                loaded: boolean;
                loading: boolean;
            };
            update: {
                error: any;
                loaded: boolean;
                loading: boolean;
            };
            update_password: {
                error: any;
                loaded: boolean;
                loading: boolean;
            };
            password: {
                error: any;
                loaded: boolean;
                loading: boolean;
            };
            initial: {
                error: any;
                loaded: boolean;
                loading: boolean;
            };
            reset: {
                error: any;
                loaded: boolean;
                loading: boolean;
            };
        };
        userSession: {
            token: string;
            login: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
        };
        vocabularies: {};
        workflow: {
            get: {
                loading: boolean;
                loaded: boolean;
                error: any;
            };
            transition: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            history: any[];
            transitions: any[];
            multiple: any[];
        };
        toolbar: {
            expanded: boolean;
        };
        lazyLibraries: {};
    };
    render(): JSX.Element;
}
export class RealStoreWrapper extends Component<any, any, any> {
    /**
     * Property types.
     * @property {Object} propTypes Property types.
     * @static
     */
    static propTypes: {
        pathname: any;
        anonymous: any;
        customStore: any;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    customState(): {
        router: {
            location: {
                pathname: string;
                search: string;
                hash: string;
                key: string;
                query: {};
            };
            action: string;
        };
        intl: {
            defaultLocale: string;
            locale: string;
            messages: {};
        };
        reduxAsyncConnect: {
            loaded: boolean;
            loadState: {
                breadcrumbs: {
                    loading: boolean;
                    loaded: boolean;
                    error: any;
                };
                content: {
                    loading: boolean;
                    loaded: boolean;
                    error: any;
                };
                navigation: {
                    loading: boolean;
                    loaded: boolean;
                    error: any;
                };
                workflow: {
                    loading: boolean;
                    loaded: boolean;
                    error: any;
                };
            };
            breadcrumbs: {
                '@id': string;
                items: any[];
            };
            content: {
                '@components': {
                    actions: {
                        '@id': string;
                    };
                    breadcrumbs: {
                        '@id': string;
                    };
                    navigation: {
                        '@id': string;
                    };
                };
                '@id': string;
                '@type': string;
                blocks: {
                    '0358abe2-b4f1-463d-a279-a63ea80daf19': {
                        '@type': string;
                    };
                    '07c273fc-8bfc-4e7d-a327-d513e5a945bb': {
                        '@type': string;
                    };
                    '2dfe8e4c-5bf6-43f1-93e1-6c320ede7226': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: {
                                    length: number;
                                    offset: number;
                                    style: string;
                                }[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    '3c881f51-f75b-4959-834a-6e1d5edc32ae': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: {
                                    length: number;
                                    offset: number;
                                    style: string;
                                }[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    '5e1c30b1-ec6c-4dc0-9483-9768c3c416e4': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: {
                                    key: number;
                                    length: number;
                                    offset: number;
                                }[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {
                                0: {
                                    data: {
                                        href: string;
                                        rel: string;
                                        url: string;
                                    };
                                    mutability: string;
                                    type: string;
                                };
                                1: {
                                    data: {
                                        href: string;
                                        url: string;
                                    };
                                    mutability: string;
                                    type: string;
                                };
                            };
                        };
                    };
                    '61cc1bc0-d4f5-4e2b-9152-79512045a4dd': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    '874049e7-629e-489a-b46c-1adf35ad40ee': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    '942b6530-2407-420f-9c24-597adda6b2ce': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: {
                                    key: number;
                                    length: number;
                                    offset: number;
                                }[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {
                                0: {
                                    data: {
                                        href: string;
                                        url: string;
                                    };
                                    mutability: string;
                                    type: string;
                                };
                            };
                        };
                    };
                    '9a976b8e-72ba-468a-bea8-b37a31bb386b': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: {
                                    length: number;
                                    offset: number;
                                    style: string;
                                }[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    'b3717238-448f-406e-b06f-57a9715c3326': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: {
                                    key: number;
                                    length: number;
                                    offset: number;
                                }[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {
                                0: {
                                    data: {
                                        href: string;
                                        url: string;
                                    };
                                    mutability: string;
                                    type: string;
                                };
                            };
                        };
                    };
                    'c049ff8b-3e5a-4cfb-bca6-e4a6cca9be28': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    'c91f0fe9-f2e9-4a17-84a5-8e4f2678ed3c': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: {
                                    length: number;
                                    offset: number;
                                    style: string;
                                }[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    'e0ca2fbc-7800-4b9b-afe5-8e42af9f5dd6': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    'effbdcdc-253c-41a7-841e-5edb3b56ce32': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: {
                                    key: number;
                                    length: number;
                                    offset: number;
                                }[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {
                                0: {
                                    data: {
                                        href: string;
                                        rel: string;
                                        url: string;
                                    };
                                    mutability: string;
                                    type: string;
                                };
                            };
                        };
                    };
                };
                blocks_layout: {
                    items: string[];
                };
                description: string;
                id: string;
                is_folderish: boolean;
                items: {
                    '@id': string;
                    '@type': string;
                    description: string;
                    review_state: string;
                    title: string;
                }[];
                items_total: number;
                parent: {};
                title: string;
            };
            navigation: {
                '@id': string;
                items: {
                    '@id': string;
                    description: string;
                    title: string;
                }[];
            };
            workflow: {
                '@id': string;
                history: any[];
                transitions: any[];
            };
        };
        actions: {
            error: any;
            actions: {
                document_actions: any[];
                object: {
                    icon: string;
                    id: string;
                    title: string;
                }[];
                object_buttons: any[];
                portal_tabs: {
                    icon: string;
                    id: string;
                    title: string;
                }[];
                site_actions: {
                    icon: string;
                    id: string;
                    title: string;
                }[];
                user: {
                    icon: string;
                    id: string;
                    title: string;
                }[];
            };
            loaded: boolean;
            loading: boolean;
        };
        addons: {
            error: any;
            installedAddons: any[];
            availableAddons: any[];
            upgradableAddons: any[];
            loaded: boolean;
            loading: boolean;
        };
        apierror: {
            error: any;
            statusCode: any;
            connectionRefused: boolean;
            message: any;
        };
        breadcrumbs: {
            error: any;
            items: {
                title: string;
                url: string;
            }[];
            loaded: boolean;
            loading: boolean;
        };
        browserdetect: {
            name: string;
            version: string;
            os: string;
            type: string;
        };
        comments: {
            add: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            delete: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            update: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            list: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            items: any[];
        };
        content: {
            unlock: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            create: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            delete: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            update: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            get: {
                loading: boolean;
                loaded: boolean;
                error: any;
            };
            order: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            data: {
                '@components': {
                    actions: {
                        '@id': string;
                    };
                    breadcrumbs: {
                        '@id': string;
                    };
                    navigation: {
                        '@id': string;
                    };
                };
                '@id': string;
                '@type': string;
                blocks: {
                    '0358abe2-b4f1-463d-a279-a63ea80daf19': {
                        '@type': string;
                    };
                    '07c273fc-8bfc-4e7d-a327-d513e5a945bb': {
                        '@type': string;
                    };
                    '2dfe8e4c-5bf6-43f1-93e1-6c320ede7226': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: {
                                    length: number;
                                    offset: number;
                                    style: string;
                                }[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    '3c881f51-f75b-4959-834a-6e1d5edc32ae': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: {
                                    length: number;
                                    offset: number;
                                    style: string;
                                }[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    '5e1c30b1-ec6c-4dc0-9483-9768c3c416e4': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: {
                                    key: number;
                                    length: number;
                                    offset: number;
                                }[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {
                                0: {
                                    data: {
                                        href: string;
                                        rel: string;
                                        url: string;
                                    };
                                    mutability: string;
                                    type: string;
                                };
                                1: {
                                    data: {
                                        href: string;
                                        url: string;
                                    };
                                    mutability: string;
                                    type: string;
                                };
                            };
                        };
                    };
                    '61cc1bc0-d4f5-4e2b-9152-79512045a4dd': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    '874049e7-629e-489a-b46c-1adf35ad40ee': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    '942b6530-2407-420f-9c24-597adda6b2ce': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: {
                                    key: number;
                                    length: number;
                                    offset: number;
                                }[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {
                                0: {
                                    data: {
                                        href: string;
                                        url: string;
                                    };
                                    mutability: string;
                                    type: string;
                                };
                            };
                        };
                    };
                    '9a976b8e-72ba-468a-bea8-b37a31bb386b': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: {
                                    length: number;
                                    offset: number;
                                    style: string;
                                }[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    'b3717238-448f-406e-b06f-57a9715c3326': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: {
                                    key: number;
                                    length: number;
                                    offset: number;
                                }[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {
                                0: {
                                    data: {
                                        href: string;
                                        url: string;
                                    };
                                    mutability: string;
                                    type: string;
                                };
                            };
                        };
                    };
                    'c049ff8b-3e5a-4cfb-bca6-e4a6cca9be28': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    'c91f0fe9-f2e9-4a17-84a5-8e4f2678ed3c': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: {
                                    length: number;
                                    offset: number;
                                    style: string;
                                }[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    'e0ca2fbc-7800-4b9b-afe5-8e42af9f5dd6': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: any[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {};
                        };
                    };
                    'effbdcdc-253c-41a7-841e-5edb3b56ce32': {
                        '@type': string;
                        text: {
                            blocks: {
                                data: {};
                                depth: number;
                                entityRanges: {
                                    key: number;
                                    length: number;
                                    offset: number;
                                }[];
                                inlineStyleRanges: any[];
                                key: string;
                                text: string;
                                type: string;
                            }[];
                            entityMap: {
                                0: {
                                    data: {
                                        href: string;
                                        rel: string;
                                        url: string;
                                    };
                                    mutability: string;
                                    type: string;
                                };
                            };
                        };
                    };
                };
                blocks_layout: {
                    items: string[];
                };
                description: string;
                id: string;
                is_folderish: boolean;
                items: {
                    '@id': string;
                    '@type': string;
                    description: string;
                    review_state: string;
                    title: string;
                    url: string;
                }[];
                items_total: number;
                parent: {};
                title: string;
            };
            subrequests: {};
        };
        controlpanels: {
            get: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            list: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            update: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            post: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            delete: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            controlpanel: any;
            controlpanels: any[];
            systeminformation: any;
            databaseinformation: any;
        };
        clipboard: {
            action: any;
            source: any;
            request: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
        };
        diff: {
            error: any;
            data: any[];
            loaded: boolean;
            loading: boolean;
        };
        emailNotification: {
            error: any;
            loaded: boolean;
            loading: boolean;
        };
        form: {};
        groups: {
            create: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            delete: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            get: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            list: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            update: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            groups: any[];
            group: {};
        };
        history: {
            entries: any[];
            get: {
                error: any;
                loaded: boolean;
                loading: boolean;
            };
            revert: {
                error: any;
                loaded: boolean;
                loading: boolean;
            };
        };
        messages: {
            messages: any[];
        };
        navigation: {
            error: any;
            items: {
                title: string;
                url: string;
            }[];
            loaded: boolean;
            loading: boolean;
        };
        querystring: {
            error: any;
            indexes: {};
            sortable_indexes: {};
            loaded: boolean;
            loading: boolean;
        };
        querystringsearch: {
            error: any;
            items: any[];
            total: number;
            loaded: boolean;
            loading: boolean;
            batching: {};
            subrequests: {};
        };
        roles: {
            error: any;
            roles: any[];
            loaded: boolean;
            loading: boolean;
        };
        schema: {
            error: any;
            loaded: boolean;
            loading: boolean;
            schema: any;
            post: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            update: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            put: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
        };
        search: {
            error: any;
            items: any[];
            total: number;
            loaded: boolean;
            loading: boolean;
            batching: {};
            subrequests: {};
        };
        sharing: {
            update: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            get: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            data: {
                available_roles: any[];
                entries: any[];
                inherit: any;
            };
        };
        sidebar: {
            tab: number;
        };
        types: {
            error: any;
            loaded: boolean;
            loading: boolean;
            types: {
                '@id': string;
                addable: boolean;
                title: string;
            }[];
        };
        users: {
            user: {};
            users: any[];
            create: {
                error: any;
                loaded: boolean;
                loading: boolean;
            };
            get: {
                error: any;
                loaded: boolean;
                loading: boolean;
            };
            list: {
                error: any;
                loaded: boolean;
                loading: boolean;
            };
            delete: {
                error: any;
                loaded: boolean;
                loading: boolean;
            };
            update: {
                error: any;
                loaded: boolean;
                loading: boolean;
            };
            update_password: {
                error: any;
                loaded: boolean;
                loading: boolean;
            };
            password: {
                error: any;
                loaded: boolean;
                loading: boolean;
            };
            initial: {
                error: any;
                loaded: boolean;
                loading: boolean;
            };
            reset: {
                error: any;
                loaded: boolean;
                loading: boolean;
            };
        };
        userSession: {
            token: string;
            login: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
        };
        vocabularies: {};
        workflow: {
            get: {
                loading: boolean;
                loaded: boolean;
                error: any;
            };
            transition: {
                loaded: boolean;
                loading: boolean;
                error: any;
            };
            history: any[];
            transitions: any[];
            multiple: any[];
        };
        toolbar: {
            expanded: boolean;
        };
        lazyLibraries: {};
    };
    render(): JSX.Element;
}
export function FormUndoWrapper({ initialState, children, showControls, }: {
    initialState?: {};
    children: any;
    showControls?: boolean;
}): JSX.Element;
import { Component } from 'react';
