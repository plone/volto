import { Link } from 'react-aria-components';
import { useLocation } from 'react-router';

const HeaderTools = () => {
  const location = useLocation();

  const links = [
    {
      id: '3',
      label: 'edit',
      icon: '🛠️',
      url: `/@@edit${location.pathname.replace(/^\/$/, '')}`,
    },
    {
      id: '1',
      label: 'login',
      icon: '🔧',
      url: '/login',
    },
    {
      id: '2',
      label: 'logout',
      icon: '🔨',
      url: '/logout',
    },
  ];
  return (
    // Inline styles since this is temporary during seven development
    <div style={{ display: 'flex', gap: '16px' }}>
      {links.map((tool) => (
        <Link key={tool.id} href={tool.url}>
          <span>{tool.icon}</span>
          <span>{tool.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default HeaderTools;
