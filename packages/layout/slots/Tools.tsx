import { Link } from 'react-aria-components';

const HeaderTools = () => {
  const links = [
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
