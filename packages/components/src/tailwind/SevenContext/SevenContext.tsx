import { createContext } from 'react';
import { tv } from 'tailwind-variants'; // Import tv to infer its type

// Infer the type of the first argument to the 'tv' function
// This correctly captures the structure of the configuration object
type TvConfigType = Parameters<typeof tv>[0];

interface context {
  button?: TvConfigType;
  checkbox?: TvConfigType;
}
export const SevenContext = createContext<context>({
  button: {},
  checkbox: {},
});
