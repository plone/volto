export default element => {
  if (element.className === 'callout') {
    return {
      type: 'callout',
    };
  }
  if (element.className === 'arrow-list-item') {
    return {
      type: 'arrowList',
    };
  }
  if (element.className === 'checkmarks-list-item') {
    return {
      type: 'checkmarksList',
    };
  }
  return null;
};
