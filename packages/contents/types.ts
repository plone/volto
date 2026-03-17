export type TableIndexes = {
  order: string[];
  values: {
    [index: string]: {
      type: string;
      label: string;
      selected: boolean;
      sort_on?: string;
    };
  };
  selectedCount: number;
};
