import config from '@plone/registry';

export const getContentIcon = (
  contentType: string,
  isFolderish: boolean = false,
) => {
  const { settings } = config;
  const { contentIcons = {} } = settings;

  let icon = isFolderish ? contentIcons.Folder : contentIcons.File;
  if (contentType in contentIcons) icon = contentIcons[contentType];
  return icon;
};
