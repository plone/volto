export function loadProtector(state?: {}, action?: {}): {};
export function protectLoadStart({ dispatch, getState }: {
    dispatch: any;
    getState: any;
}): (next: any) => (action: any) => any;
export function protectLoadEnd({ dispatch, getState }: {
    dispatch: any;
    getState: any;
}): (next: any) => (action: any) => any;
