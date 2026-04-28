import * as React from 'react';

import type { TDiscussion, TDiscussionUser } from './plugins/discussion-kit';

type PlatePluginsContextValue = {
  currentUser: TDiscussionUser | null;
  currentUserId: string | null;
  discussions: TDiscussion[];
  setDiscussions: React.Dispatch<React.SetStateAction<TDiscussion[]>>;
  setUsers: React.Dispatch<
    React.SetStateAction<Record<string, TDiscussionUser>>
  >;
  users: Record<string, TDiscussionUser>;
};

const PlatePluginsContext =
  React.createContext<PlatePluginsContextValue | null>(null);

export const PlatePluginsProvider = ({
  children,
  value,
}: React.PropsWithChildren<{ value: PlatePluginsContextValue }>) => {
  return (
    <PlatePluginsContext.Provider value={value}>
      {children}
    </PlatePluginsContext.Provider>
  );
};

export const usePlatePlugins = () => {
  const context = React.useContext(PlatePluginsContext);

  if (!context) {
    throw new Error('PlatePluginsContext is missing');
  }

  return context;
};
