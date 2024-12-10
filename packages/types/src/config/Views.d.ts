import { Content } from '../content';

export interface ViewProps {
  content: Content;
}

export interface ViewsConfig {
  layoutViews: {
    [key: string]: React.ComponentType<ViewProps>;
  };
  contentTypesViews: {
    [key: string]: React.ComponentType<ViewProps>;
  };
  defaultView: React.ComponentType<ViewProps>;
  errorViews: {
    [key: string]: React.ComponentType<ViewProps>;
  };
  layoutViewsNamesMapping: {
    [key: string]: string;
  };
}
