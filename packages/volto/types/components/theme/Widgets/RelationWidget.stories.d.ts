export const Relation: any;
declare namespace _default {
    export let title: string;
    export { RelationWidget as component };
    export namespace argTypes {
        namespace value {
            export let options: string[];
            export { options as mapping };
            export namespace control {
                let type: string;
                let labels: {
                    0: string;
                    1: string;
                    2: string;
                    3: string;
                };
            }
        }
    }
}
export default _default;
import RelationWidget from './RelationWidget';
declare const options_1: ({
    '@id': string;
    token: string;
    title: string;
    '@type': string;
    is_folderish: boolean;
    description?: undefined;
} | {
    '@id': string;
    token: string;
    title: string;
    '@type': string;
    description: string;
    is_folderish?: undefined;
} | {
    '@id': string;
    token: string;
    title: string;
    '@type': string;
    is_folderish?: undefined;
    description?: undefined;
} | {
    '@id': string;
    token: string;
    title: string;
    '@type'?: undefined;
    is_folderish?: undefined;
    description?: undefined;
})[];
