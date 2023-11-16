export default blacklistRoutes;
declare function blacklistRoutes({ dispatch, getState }: {
    dispatch: any;
    getState: any;
}): (next: any) => (action: any) => any;
