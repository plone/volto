export function getUpgradeInformation(): {
    type: string;
    request: {
        op: string;
        path: string;
    };
};
export function runUpgrade(dryRun: any): {
    type: string;
    request: {
        op: string;
        path: string;
        data: {
            dryRun: any;
        };
    };
};
