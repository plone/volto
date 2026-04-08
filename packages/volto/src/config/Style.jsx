export const styleClassNameConverters = {
  default: (name, value, prefix = '') => {
    return value
      ? `has--${prefix}${name}--${(value || '').toString().replace(/^#/, '')}`
      : null;
  },
  noprefix: (name, value) => value,
  bool: (name, value) => (value ? name : ''),
};

export const styleClassNameExtenders = [];
