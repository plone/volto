const HeaderTools = (props) => {
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
        <a
          key={tool.id}
          href={tool.url}
          className="flex items-center gap-2 p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <span>{tool.icon}</span>
          <span>{tool.label}</span>
        </a>
      ))}
    </div>
  );
};

export default HeaderTools;
