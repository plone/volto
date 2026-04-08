export function getLeadImageBlockSizes(data) {
  if (data.align === 'full' || data.align === 'center') {
    return '100vw';
  }
  if (data.align === 'left' || data.align === 'right') {
    return '50vw';
  }
  return undefined;
}
