export default slots;
declare namespace slots {
    let belowContent: {
        name: string;
        component: {
            ({ content }: {
                content: {
                    subjects?: any[];
                };
            }): JSX.Element;
            propTypes: {
                content: any;
            };
            defaultProps: {
                content: {
                    subjects: any[];
                };
            };
        };
    }[];
}
