export function srcToDataUri(url, callback) {
  // Based on https://github.com/ianstormtaylor/slate-plugins
  const canvas = window.document.createElement('canvas');
  const img = window.document.createElement('img');

  if (!canvas.getContext) {
    return setTimeout(callback, 0, new Error('Canvas is not supported.'));
  }

  img.onload = () => {
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const dataUri = canvas.toDataURL('image/png');
    callback(null, dataUri);
  };

  img.ononerror = () => {
    callback(new Error('Failed to load image.'));
  };

  img.setAttribute('crossOrigin', 'anonymous');
  img.src = url;
}
