export function getImageBlockSizes(data) {
  if (data.align === 'full') return '100vw';
  if (data.align === 'center') {
    if (data.size === 'l') return '100vw';
    if (data.size === 'm') return '50vw';
    if (data.size === 's') return '25vw';
  }
  if (data.align === 'left' || data.align === 'right') {
    if (data.size === 'l') return '50vw';
    if (data.size === 'm') return '25vw';
    if (data.size === 's') return '15vw';
  }
  return undefined;
}
