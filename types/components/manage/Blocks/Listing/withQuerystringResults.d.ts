export default function withQuerystringResults(WrappedComponent: any): {
    (props: any): JSX.Element;
    displayName: string;
} & hoistNonReactStatics.NonReactStatics<any, {}>;
import hoistNonReactStatics from 'hoist-non-react-statics';
