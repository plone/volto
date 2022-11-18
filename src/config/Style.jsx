export const styleClassNameConverters = {
  default: (name, value, prefix) => {
    return `has--${prefix ? prefix : ''}${name}--${(value || '')
      .toString()
      .replace(/^#/, '')}`;
  },
  noprefix: (name, value) => value,
  bool: (name, value) => (value ? name : ''),
};
