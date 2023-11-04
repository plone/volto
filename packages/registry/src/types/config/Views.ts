export interface ViewsConfig {
  layoutViews: {
    [key: string]: React.ComponentType;
  };
  contentTypesViews: {
    [key: string]: React.ComponentType;
  };
  defaultView: React.ComponentType;
  errorViews: {
    [key: string]: React.ComponentType;
  };
  layoutViewsNamesMapping: {
    [key: string]: string;
  };
}
