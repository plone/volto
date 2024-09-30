import { ReactNode } from 'react';

export type Toast = {
  error: (content: ReactNode | null) => string | number;
  success: (content: ReactNode | null) => string | number;
};

export type IntlShape = {
  locale: string;
  formatMessage: {
    (
      descriptor: {
        id: string;
        defaultMessage?: string;
      },
      values?: Record<string, ReactNode>,
    ): string;
  };
};
