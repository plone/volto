import { Link } from 'react-aria-components';
import { useLocation, useRouteLoaderData } from 'react-router';
import type { RootLoader } from 'seven/app/root';

const HeaderTools = () => {
  const location = useLocation();
  const rootData = useRouteLoaderData<RootLoader>('root');

  const isLoggedIn = !!rootData?.isAuthenticated;

  const links = [
    ...(isLoggedIn
      ? [
          {
            id: '3',
            label: 'edit',
            icon: '🛠️',
            url: `/@@edit${location.pathname.replace(/^\/$/, '')}`,
          },
          {
            id: '2',
            label: 'logout',
            icon: '🔨',
            url: '/logout',
          },
        ]
      : [
          {
            id: '1',
            label: 'login',
            icon: '🔧',
            url: '/login',
          },
        ]),
  ];
  // Inline styles since this is temporary during seven development
  return import.meta.env.DEV ? (
    <div style={{ display: 'flex', gap: '16px' }}>
      {links.map((tool) => (
        <Link key={tool.id} href={tool.url}>
          <span>{tool.icon}</span>
          <span>{tool.label}</span>
        </Link>
      ))}
    </div>
  ) : null;
};

export default HeaderTools;
