import { createContext } from 'react';

interface context {
  button: object;
  checkbox: object;
}
export const SevenContext = createContext<context>({
  button: {},
  checkbox: {},
});
