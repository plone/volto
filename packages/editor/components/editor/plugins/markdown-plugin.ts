import { MarkdownPlugin, remarkMention } from '@udecode/plate-markdown';
import { SuggestionPlugin } from '@udecode/plate-suggestion/react';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
export const markdownPlugin = MarkdownPlugin.configure({
  options: {
    disallowedNodes: [SuggestionPlugin.key],
    remarkPlugins: [remarkGfm, remarkMdx, remarkMention],
  },
});
