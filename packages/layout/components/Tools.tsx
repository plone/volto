import type { GetSlotArgs } from '@plone/types';
import { Link } from 'react-aria-components';

type HeaderToolsProps = {
  // content: GetSlotArgs['content'];
  location: GetSlotArgs['location'];
};

const HeaderTools = (props: HeaderToolsProps) => {
  const { location } = props;
  const pathname = location.pathname.length > 1 ? location.pathname : '';
  const links = [
    {
      id: '3',
      label: 'edit',
      icon: '🛠️',
      url: '/edit',
    },
    {
      id: '4',
      label: 'contents',
      icon: '📂',
      url: '/@@contents' + pathname,
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
