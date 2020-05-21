export default (element) => {
  if (element.className === 'callout') {
    return {
      type: 'callout',
    };
  }
  return null;
};
