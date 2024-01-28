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
        let href: PropTypes.Requireable<string>;
        let openLinkInNewTab: PropTypes.Requireable<boolean>;
        let download: PropTypes.Requireable<boolean>;
        let className: PropTypes.Requireable<string>;
        let title: PropTypes.Requireable<string>;
        let item: PropTypes.Requireable<PropTypes.InferProps<{
            '@id': PropTypes.Validator<string>;
            remoteUrl: PropTypes.Requireable<string>;
        }>>;
        let children: PropTypes.Requireable<NonNullable<PropTypes.ReactNodeLike>>;
    }
}
import PropTypes from 'prop-types';
