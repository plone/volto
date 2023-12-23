export function getUpgradeInformation(): {
    type: any;
    request: {
        op: string;
        path: string;
    };
};
export function runUpgrade(dryRun: any): {
    type: any;
    request: {
        op: string;
        path: string;
        data: {
            dryRun: any;
        };
    };
};
