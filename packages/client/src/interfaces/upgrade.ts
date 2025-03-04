import { z } from 'zod';

interface UpgradeSteps {
  [step: string]: Array<{
    id: string;
    title: string;
  }>;
}

export interface GetUpgradeResponse {
  '@id': string;
  upgrade_steps: UpgradeSteps;
  versions: {
    fs: string;
    instance: string;
  };
}

export const runUpgradeDataSchema = z.object({
  dry_run: z.boolean(),
});

export interface RunUpgradeResponse {
  '@id': string;
  dry_run: boolean;
  report: string;
  upgraded: boolean;
  versions: {
    fs: string;
    instance: string;
  };
}
