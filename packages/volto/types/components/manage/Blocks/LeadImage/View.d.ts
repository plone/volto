export default View;
declare function View({ data, properties }: {
    data: any;
    properties: any;
}): JSX.Element;
declare namespace View {
    namespace propTypes {
        let data: any;
        let properties: any;
    }
}
