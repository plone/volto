import type { Content } from '@plone/types';

export function ContentFolderishCondition() {
  return ({ content }: { content: Content }) => {
    return content.is_folderish;
  };
}
