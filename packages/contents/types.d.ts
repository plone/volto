import { ReactNode } from 'react';

export type Toast = {
  error: (content: ReactNode | null) => string | number;
};
