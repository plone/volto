export default withSearch;
declare function withSearch(options: any): (WrappedComponent: any) => {
    (props: any): JSX.Element;
    displayName: string;
};
