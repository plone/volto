export namespace options {
    let cleanup: boolean;
}
export default renderers;
declare namespace renderers {
    export { inline };
    export { blocks };
    export { entities };
}
declare namespace inline {
    function BOLD(children: any, { key }: {
        key: any;
    }): import("react/jsx-runtime").JSX.Element;
    function ITALIC(children: any, { key }: {
        key: any;
    }): import("react/jsx-runtime").JSX.Element;
    function UNDERLINE(children: any, { key }: {
        key: any;
    }): import("react/jsx-runtime").JSX.Element;
    function CODE(children: any, { key }: {
        key: any;
    }): import("react/jsx-runtime").JSX.Element;
}
/**
 * Note that children can be maped to render a list or do other cool stuff
 */
declare const blocks: {
    unstyled: (children: any, { keys }: {
        keys: any;
    }) => any;
    atomic: (children: any) => any;
    blockquote: (children: any, { keys }: {
        keys: any;
    }) => import("react/jsx-runtime").JSX.Element;
    'header-one': (children: any, { keys }: {
        keys: any;
    }) => any;
    'header-two': (children: any, { keys }: {
        keys: any;
    }) => any;
    'header-three': (children: any, { keys }: {
        keys: any;
    }) => any;
    'header-four': (children: any, { keys }: {
        keys: any;
    }) => any;
    'header-five': (children: any, { keys }: {
        keys: any;
    }) => any;
    'header-six': (children: any, { keys }: {
        keys: any;
    }) => any;
    'code-block': (children: any, { keys }: {
        keys: any;
    }) => import("react/jsx-runtime").JSX.Element;
    'unordered-list-item': (children: any, { depth, keys }: {
        depth: any;
        keys: any;
    }) => import("react/jsx-runtime").JSX.Element;
    'ordered-list-item': (children: any, { depth, keys }: {
        depth: any;
        keys: any;
    }) => import("react/jsx-runtime").JSX.Element;
    callout: (children: any, { keys }: {
        keys: any;
    }) => any;
};
declare namespace entities {
    function LINK(children: any, props: any, { key }: {
        key: any;
    }): import("react/jsx-runtime").JSX.Element;
    function IMAGE(children: any, entity: any, { key }: {
        key: any;
    }): import("react/jsx-runtime").JSX.Element;
}
