export default function AnchorPlugin(config?: {}): {
    decorators: {
        strategy: typeof linkStrategy;
        matchesEntityType: (type: any) => boolean;
        component: any;
    }[];
    LinkButton: any;
};
import linkStrategy from './linkStrategy';
