// export type Utility = Record<string, { method: (args: any) => any }>;
export type Utility = Record<string, { method: (...args: any[]) => any }>;

export type UtilitiesConfig = Record<string, Utility>;
