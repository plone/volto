import { z } from 'zod';

export interface WorkflowResponse {
  '@id': string;
  history: {
    action: null;
    actor: string;
    comments: string;
    review_state: string;
    time: string;
    title: string;
  };
  state: {
    id: string;
    title: string;
  };
  transitions: {
    '@id': string;
    title: string;
  };
}

export interface CreateWorkflowResponse {
  action: string;
  actor: string;
  comments: string;
  review_state: string;
  time: string;
  title: string;
}

export const createWorkflowDataSchema = z.object({
  comment: z.string().optional(),
  effective: z.string().optional(),
  expires: z.string().optional(),
  include_children: z.boolean().optional(),
});
