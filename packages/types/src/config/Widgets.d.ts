export type WidgetsConfig =
  | {
      [key: string]: {
        [key: string]: React.ComponentType;
      };
    }
  | { defaultWidget: React.ComponentType };
