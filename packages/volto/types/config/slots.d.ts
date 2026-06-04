export default slots;
declare namespace slots {
    let aboveApp: {
        name: string;
        component: import("@loadable/component").LoadableComponent<any>;
        predicates: (({ location }: {
            location: any;
        }) => boolean)[];
    }[];
    let belowContent: ({
        name: string;
        component: {
            ({ content }: {
                content: {
                    subjects?: any[];
                };
            }): JSX.Element | null;
            propTypes: {
                content: any;
            };
            defaultProps: {
                content: {
                    subjects: any[];
                };
            };
        };
    } | {
        name: string;
        component: {
            ({ content }: any[]): JSX.Element;
            propTypes: {
                content: any;
            };
        };
    })[];
}
