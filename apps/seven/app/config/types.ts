import { Content } from '@plone/types';
import type PloneClient from '@plone/client';
import type { Value } from '@plone/plate/components/editor';
import type { Params } from 'react-router';

declare module '@plone/types' {
  interface UtilityTypeMap {
    rootContentSubRequest: (args: LoaderUtilityArgs) => Promise<unknown>;
    rootLoaderData: (
      args: LoaderUtilityArgs,
    ) => Promise<{ status: number; data: unknown }>;
    somersaultBlockMigration: (
      args: SomersaultBlockMigrationArgs,
    ) => SomersaultMigrationArgs['value'];
    somersaultMigration: (
      args: SomersaultMigrationArgs,
    ) => SomersaultMigrationArgs['value'];
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

export interface SomersaultMigrationArgs {
  content: Content;
  value: Value;
}

export interface SomersaultBlockMigrationArgs {
  block: Record<string, unknown>;
  blockId: string;
  content: Content;
}
