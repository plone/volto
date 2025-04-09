import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import type { UniversalLinkProps } from '@plone/volto/components/manage/UniversalLink/UniversalLink';

type ConditionalLinkProps = UniversalLinkProps & {
  condition: boolean;
  to: string;
};

const ConditionalLink = ({ condition, to, ...props }: ConditionalLinkProps) => {
  if (condition) {
    if (!props.item && to) {
      return (
        <UniversalLink {...props} href={to}>
          {props.children}
        </UniversalLink>
      );
    } else {
      return <UniversalLink {...props}>{props.children}</UniversalLink>;
    }
  } else {
    return <>{props.children}</>;
  }
};

export default ConditionalLink;
