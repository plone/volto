export default function FromHTMLCustomBlockFn(element) {
  if (element.className === 'callout') {
    return {
      type: 'callout',
    };
  }
  return null;
}
