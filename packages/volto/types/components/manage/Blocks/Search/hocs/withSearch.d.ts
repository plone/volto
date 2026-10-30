export default withSearch;
declare function withSearch(options: any): (WrappedComponent: any) => {
    (props: any): React.JSX.Element;
    displayName: string;
};
import React from 'react';
