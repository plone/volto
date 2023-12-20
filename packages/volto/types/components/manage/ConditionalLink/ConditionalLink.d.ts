export default ConditionalLink;
declare function ConditionalLink({ condition, to, item, ...props }: {
    [x: string]: any;
    condition: any;
    to: any;
    item: any;
}): any;
declare namespace ConditionalLink {
    namespace propTypes {
        let condition: any;
        let to: any;
        let item: any;
        let children: any;
    }
}
