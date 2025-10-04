import type { SlateLeafProps, TCommentText } from 'platejs';

import { SlateLeaf } from 'platejs';

export function CommentLeafStatic(props: SlateLeafProps<TCommentText>) {
  return (
    <SlateLeaf
      {...props}
      className="border-b-highlight/35 bg-highlight/15 border-b-2"
    >
      {props.children}
    </SlateLeaf>
  );
}
