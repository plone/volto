export default ErrorBoundary;
declare class ErrorBoundary {
    static getDerivedStateFromError(error: any): {
        hasError: boolean;
    };
    constructor(props: any);
    state: {
        hasError: boolean;
    };
    componentDidCatch(error: any, errorInfo: any): void;
    render(): any;
}
