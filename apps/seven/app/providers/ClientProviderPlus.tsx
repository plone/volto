import { PropsWithChildren } from 'react';
import { useHref, useNavigate } from 'react-router';
import { RouterProvider } from 'react-aria-components';

// declare module 'react-aria-components' {
//   interface RouterConfig {
//     routerOptions: NonNullable<
//       Parameters<ReturnType<typeof useRouter>['push']>[1]
//     >;
//   }
// }

export function ClientProviderPlus({ children }: PropsWithChildren) {
  console.debug('** ClientProviderPlus');
  const navigate = useNavigate();

  return (
    <RouterProvider navigate={navigate} useHref={useHref}>
      {children}
    </RouterProvider>
  );
}
