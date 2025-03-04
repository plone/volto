import { z } from 'zod';

type CommentText = {
  data: string;
  'mime-type': string;
};

type CommentData = {
  '@id': string;
  '@parent': string | null;
  '@type': 'Discussion Item';
  author_image: string | null;
  author_name: string | null;
  author_username: string | null;
  can_reply: boolean;
  comment_id: string;
  creation_date: string;
  in_reply_to: string | null;
  is_deletable: boolean;
  is_editable: boolean;
  modification_date: string;
  text: CommentText;
  user_notification: string | null;
};

export interface GetCommentsResponse {
  '@id': string;
  items: CommentData[];
  items_total: number;
  permissions: {
    can_reply: boolean;
    view_comments: boolean;
  };
}

export const newCommentDataSchema = z.object({
  text: z.string(),
});
