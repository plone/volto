import type { RouteConfig } from '@react-router/dev/routes';
import { index, route } from '@react-router/dev/routes';

export const routes: RouteConfig = [
  index('routes/home.tsx'),
  route('*', 'routes/$.tsx'),
];
