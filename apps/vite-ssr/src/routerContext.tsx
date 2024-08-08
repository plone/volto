import { QueryClient } from '@tanstack/react-query';
import PloneClient from '@plone/client';

export type RouterContext = {
  head: string;
  queryClient: QueryClient;
  ploneClient: PloneClient;
};
