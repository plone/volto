export const Default: any;
export const MultipleFieldsets: any;
export const DefaultValues: any;
export function SchemaExtender(args: any): import("react/jsx-runtime").JSX.Element;
export namespace SchemaExtender {
    namespace args {
        export { defaultSchema as schema };
        export { defaultSecondarySchema as secondarySchema };
    }
}
declare namespace _default {
    export let title: string;
    export { ObjectListWidgetDefault as component };
    export let decorators: ((Story: any) => import("react/jsx-runtime").JSX.Element)[];
    export namespace argTypes {
        let schema: {};
    }
}
export default _default;
declare namespace defaultSchema {
    let title_1: string;
    export { title_1 as title };
    export let addMessage: string;
    export let fieldsets: {
        id: string;
        title: string;
        fields: string[];
    }[];
    export namespace properties {
        export namespace href {
            let title_2: string;
            export { title_2 as title };
            export let widget: string;
            export let mode: string;
            export let selectedItemAttrs: string[];
            export let allowExternals: boolean;
        }
        export namespace title_3 {
            let title_4: string;
            export { title_4 as title };
        }
        export { title_3 as title };
        export namespace description {
            let title_5: string;
            export { title_5 as title };
        }
        export namespace preview_image {
            let title_6: string;
            export { title_6 as title };
            let widget_1: string;
            export { widget_1 as widget };
            let mode_1: string;
            export { mode_1 as mode };
            let allowExternals_1: boolean;
            export { allowExternals_1 as allowExternals };
        }
    }
    export let required: any[];
}
declare namespace defaultSecondarySchema {
    let title_7: string;
    export { title_7 as title };
    let fieldsets_1: {
        id: string;
        title: string;
        fields: string[];
    }[];
    export { fieldsets_1 as fieldsets };
    export namespace properties_1 {
        namespace size {
            let title_8: string;
            export { title_8 as title };
        }
    }
    export { properties_1 as properties };
    let required_1: any[];
    export { required_1 as required };
}
import ObjectListWidgetDefault from './ObjectListWidget';
