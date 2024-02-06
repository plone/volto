export function usePagination(id?: any, defaultPage?: number): {
    currentPage: number;
    setCurrentPage: (page: any) => void;
};
