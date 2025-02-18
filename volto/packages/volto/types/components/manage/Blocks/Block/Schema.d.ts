export default Schema;
declare namespace Schema {
    export let title: string;
    export let fieldsets: {
        id: string;
        title: string;
        fields: string[];
    }[];
    export namespace properties {
        namespace placeholder {
            let title_1: string;
            export { title_1 as title };
            export let description: string;
            export let type: string;
        }
        namespace required {
            let title_2: string;
            export { title_2 as title };
            let description_1: string;
            export { description_1 as description };
            let type_1: string;
            export { type_1 as type };
        }
        namespace fixed {
            let title_3: string;
            export { title_3 as title };
            let description_2: string;
            export { description_2 as description };
            let type_2: string;
            export { type_2 as type };
        }
        namespace disableNewBlocks {
            let title_4: string;
            export { title_4 as title };
            let description_3: string;
            export { description_3 as description };
            let type_3: string;
            export { type_3 as type };
        }
        namespace readOnly {
            let title_5: string;
            export { title_5 as title };
            let description_4: string;
            export { description_4 as description };
            let type_4: string;
            export { type_4 as type };
        }
    }
    let required_1: any[];
    export { required_1 as required };
}
