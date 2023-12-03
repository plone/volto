import { z } from 'zod';

interface CopyMoveObject {
  source: string;
  target: string;
}

export interface CopyMoveResponse extends Array<CopyMoveObject> {}

export const copyMoveDataSchema = z.object({
  source: z.union([z.string(), z.array(z.string())]),
});
