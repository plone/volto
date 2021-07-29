const iconsContext = require.context('./', true, /svg$/);

const icons = iconsContext.keys().reduce((icons, file) => {
  const Icon = iconsContext(file);
  const label = file.slice(2, -4); // strip './' and '.svg'
  icons[label] = Icon;
  return icons;
}, {});

export default icons;
