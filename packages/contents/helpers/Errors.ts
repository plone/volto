export const HandleCatchedError = (e: any, defaultStatusText = 'Error') => {
  console.error('Error', e);

  if (typeof e === 'object' && e !== null) {
    throw {
      ...e,
      statusText: (e as any).statusText ?? defaultStatusText,
      ...(e as any).data,
    };
  } else {
    throw { statusText: `Unknown ${defaultStatusText}`, status: 500 };
  }
};
