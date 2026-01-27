import { Content } from '@plone/types';
import type PloneClient from '@plone/client';
import type { Params } from 'react-router';

declare module '@plone/types' {
  interface UtilityTypeMap {
    rootContentSubRequest: (args: LoaderUtilityArgs) => Promise<unknown>;
    rootLoaderData: (
      args: LoaderUtilityArgs,
    ) => Promise<{ status: number; data: unknown }>;
  }
}

export interface LoaderUtilityArgs {
  cli: PloneClient;
  content: Content;
  request: Request;
  path: string;
  params: Params;
  locale: string;
}
