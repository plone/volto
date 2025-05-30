import { ReactNode } from 'react';

export type Toast = {
  error: (content: ReactNode | null) => string | number;
};
// Define the type for your toast content.
export interface ToastContent {
  title: string;
  description?: string;
}
