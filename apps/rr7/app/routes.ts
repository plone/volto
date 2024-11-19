import type { RouteConfig } from '@react-router/dev/routes';
import { index, route } from '@react-router/dev/routes';

export const routes: RouteConfig = [
  index('content.tsx', { id: 'index' }),
  route('ok', 'okroute.tsx', { id: 'ok' }),
  route('*', 'content.tsx', { id: 'splat' }),
];
