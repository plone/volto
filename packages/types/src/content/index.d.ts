import type { ContentBase } from './base';

export * from './base';

/**
 * Augmentable registry that maps `@type` literal strings to their specific
 * content interfaces. Built-in Plone types are pre-registered; add custom
 * types via module declaration merging in your project:
 *
 * ```ts
 * declare module '@plone/types' {
 *   interface ContentTypeMap {
 *     'MyCustomType': MyCustomTypeContent;
 *   }
 * }
 * ```
 */
export interface ContentTypeMap {}

/**
 * Discriminated union of all registered Plone content types.
 * TypeScript narrows automatically when you check the `@type` field:
 *
 * ```ts
 * if (content['@type'] === 'Event') {
 *   content.start; // inferred as string ✓
 * }
 * ```
 *
 * For generic contexts where the specific type is unknown, use `ContentBase`.
 */
export type Content = ContentTypeMap[keyof ContentTypeMap];

export interface CreateContentResponse extends ContentBase {}
export interface UpdateContentResponse extends ContentBase {}

// Content Types
export * from './types/link';
export * from './types/event';
export * from './types/document';
export * from './types/news-item';
export * from './types/file';
export * from './types/image';
export * from './types/folder';
export * from './types/collection';

// Other
export * from './common';
