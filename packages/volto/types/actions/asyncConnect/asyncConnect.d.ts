export function clearKey(key: any): {
    type: string;
    key: any;
};
export function beginGlobalLoad(): {
    type: string;
};
export function endGlobalLoad(): {
    type: string;
};
export function load(key: any): {
    type: string;
    key: any;
};
export function loadSuccess(key: any, data: any): {
    type: string;
    key: any;
    data: any;
};
export function loadFail(key: any, error: any): {
    type: string;
    key: any;
    error: any;
};
