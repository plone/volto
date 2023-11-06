export default UniversalLink;
declare function UniversalLink({ href, item, openLinkInNewTab, download, children, className, title, ...props }: {
    [x: string]: any;
    href: any;
    item?: any;
    openLinkInNewTab: any;
    download?: boolean;
    children: any;
    className?: any;
    title?: any;
}): JSX.Element;
declare namespace UniversalLink {
    namespace propTypes {
        let href: any;
        let openLinkInNewTab: any;
        let download: any;
        let className: any;
        let title: any;
        let item: any;
        let children: any;
    }
}
