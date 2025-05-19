import { Link } from '@plone/components/tailwind';

const HeaderTools = () => {
  const links = [
    {
      id: '3',
      label: 'edit',
      icon: '🛠️',
      url: '/edit',
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
    <div className="flex gap-4">
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
