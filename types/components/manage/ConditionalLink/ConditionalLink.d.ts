export default ConditionalLink;
declare function ConditionalLink({ condition, to, item, ...props }: {
    [x: string]: any;
    condition: any;
    to: any;
    item: any;
}): JSX.Element;
declare namespace ConditionalLink {
    namespace propTypes {
        let condition: PropTypes.Requireable<boolean>;
        let to: PropTypes.Requireable<string>;
        let item: PropTypes.Requireable<PropTypes.InferProps<{
            '@id': PropTypes.Requireable<string>;
            remoteUrl: PropTypes.Requireable<string>;
        }>>;
        let children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    }
}
import PropTypes from 'prop-types';
