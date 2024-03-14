export default settings;
declare namespace settings {
    let expressMiddleware: any[];
    let criticalCssPath: string;
    let readCriticalCss: any;
    namespace extractScripts {
        let errorPages: boolean;
    }
    let staticFiles: {
        id: string;
        match: RegExp;
        headers: {
            'Cache-Control': string;
        };
    }[];
}
