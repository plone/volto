import { useLocalStorage } from 'usehooks-ts';

type CopyOrCut = {
  op: 'copy' | 'cut';
  data: string[];
};

export function useCopyOrCut() {
  return useLocalStorage<CopyOrCut>('plone-contents-copy-cut', {
    op: 'copy',
    data: [],
  });
}
