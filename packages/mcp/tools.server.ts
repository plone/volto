import { flattenToAppURL } from '@plone/helpers';
import config from '@plone/registry';
import type {
  BlockConfigBase,
  GetSiteResponse,
  GetTypeResponse,
  JSONSchema,
} from '@plone/types';
import type { Brain } from '@plone/types/src/services/common';
import type { Content } from '@plone/types/src/content';
import type PloneClient from '@plone/client';
import type {
  MCPApprovalPolicy,
  MCPConversation,
  MCPToolScope,
  MCPSession,
} from './types.ts';

type MCPToolInputSchema = Record<string, unknown>;

export type MCPReadToolName =
  | 'site.get_context'
  | 'content.get'
  | 'content.search'
  | 'content.get_blocks'
  | 'schema.get_type'
  | 'blocks.get_registry';

export interface MCPToolDefinition {
  name: MCPReadToolName;
  description: string;
  requiredScope: MCPToolScope;
  inputSchema: MCPToolInputSchema;
}

export interface SiteGetContextResult {
  site: {
    id: string;
    title: string | null;
    language: string | null;
  };
  user: {
    id: string;
    fullname: string | null;
    isAuthenticated: true;
  };
  session: {
    conversationId: string;
    sessionId: string;
    scopes: MCPToolScope[];
    approvalPolicy: MCPApprovalPolicy;
    status: MCPSession['status'];
  };
  capabilities: {
    canReadContent: boolean;
    canSearchContent: boolean;
    canCreateContent: boolean;
    canUpdateContent: boolean;
    canApplyWorkflow: boolean;
  };
}

export interface ContentGetIdentifier {
  path?: string;
  uid?: string;
  url?: string;
}

export interface ContentGetResult {
  item: {
    id: string;
    uid: string;
    path: string;
    type: string;
    title: string;
    description: string;
    language: string | null;
    reviewState: string | null;
    modified: string;
  };
  fields: {
    title: string;
    description: string;
  };
}

export interface ContentSearchInput {
  query?: string;
  path?: string;
  types?: string[];
  reviewState?: string[];
  language?: string;
  sort?: 'modified_desc' | 'modified_asc' | 'title_asc' | 'title_desc';
  limit?: number;
}

export interface ContentSearchResult {
  results: Array<{
    uid: string;
    path: string;
    title: string;
    description: string;
    type: string;
    reviewState: string;
    modified: string;
  }>;
  total: number;
  limit: number;
}

export interface ContentGetBlocksResult {
  item: {
    id: string;
    uid: string;
    path: string;
    type: string;
    title: string;
    reviewState: string | null;
    modified: string;
  };
  blocks: {
    storage: {
      blocks: Content['blocks'];
      blocksLayout: Content['blocks_layout'];
    };
    somersault: {
      present: boolean;
      value: unknown[] | null;
    };
    summary: {
      blockCount: number;
      blockTypes: string[];
      hasSomersaultBlock: boolean;
    };
  };
}

export interface ContentUpdateInput {
  identifier: ContentGetIdentifier;
  changes: Record<string, unknown>;
  reason?: string;
}

export interface ContentUpdatePayload {
  path: string;
  changes: {
    title?: string;
    description?: string;
  };
  reason: string;
}

export interface SchemaGetTypeResult {
  type: {
    id: string;
    title: string;
  };
  schema: {
    required: string[];
    fieldsets: Array<{
      id: string;
      title: string;
      description: string | null;
      fields: string[];
    }>;
    fields: Record<
      string,
      {
        type: string;
        title: string;
        description: string | null;
        required: boolean;
        default?: unknown;
        enum?: string[];
        choices?: Array<{
          value: string;
          title: string;
        }>;
        vocabulary?: string;
        widget?: string;
      }
    >;
  };
}

export interface BlocksGetRegistryResult {
  blocks: Array<{
    id: string;
    title: string;
    group: string | null;
    category: string | null;
    schema: JSONSchema | null;
    defaults: Record<string, unknown>;
    required: string[];
    blockWidth: {
      defaultWidth?: string;
      widths?: readonly string[];
    } | null;
  }>;
}

const READ_TOOL_DEFINITIONS: MCPToolDefinition[] = [
  {
    name: 'site.get_context',
    description:
      'Get the current site, authenticated user, and MCP session context.',
    requiredScope: 'site.read',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: 'content.get',
    description:
      'Fetch one content item by path, UID, or URL and return compact metadata.',
    requiredScope: 'content.read',
    inputSchema: {
      type: 'object',
      properties: {
        identifier: {
          type: 'object',
          properties: {
            path: { type: 'string' },
            uid: { type: 'string' },
            url: { type: 'string' },
          },
          additionalProperties: false,
        },
      },
      required: ['identifier'],
      additionalProperties: false,
    },
  },
  {
    name: 'content.search',
    description:
      'Search content in the current site with optional text, type, path, review state, and sort filters.',
    requiredScope: 'content.search',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'object',
          properties: {
            query: { type: 'string' },
            path: { type: 'string' },
            types: {
              type: 'array',
              items: { type: 'string' },
            },
            reviewState: {
              type: 'array',
              items: { type: 'string' },
            },
            language: { type: 'string' },
            sort: {
              type: 'string',
              enum: [
                'modified_desc',
                'modified_asc',
                'title_asc',
                'title_desc',
              ],
            },
            limit: { type: 'integer' },
          },
          additionalProperties: false,
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'content.get_blocks',
    description:
      'Fetch block storage and Somersault summary for one content item by path, UID, or URL.',
    requiredScope: 'content.read',
    inputSchema: {
      type: 'object',
      properties: {
        identifier: {
          type: 'object',
          properties: {
            path: { type: 'string' },
            uid: { type: 'string' },
            url: { type: 'string' },
          },
          additionalProperties: false,
        },
      },
      required: ['identifier'],
      additionalProperties: false,
    },
  },
  {
    name: 'schema.get_type',
    description:
      'Get the normalized schema for a Plone content type by type name.',
    requiredScope: 'schema.read',
    inputSchema: {
      type: 'object',
      properties: {
        type: { type: 'string' },
      },
      required: ['type'],
      additionalProperties: false,
    },
  },
  {
    name: 'blocks.get_registry',
    description:
      'Get the effective Seven block registry with JSON schemas and defaults.',
    requiredScope: 'blocks.read',
    inputSchema: {
      type: 'object',
      properties: {
        blockIds: {
          type: 'array',
          items: { type: 'string' },
        },
      },
      additionalProperties: false,
    },
  },
];

export function hasScope(scopes: MCPToolScope[], scope: MCPToolScope): boolean {
  return scopes.includes(scope);
}

export function getMCPReadToolDefinitions(): MCPToolDefinition[] {
  return READ_TOOL_DEFINITIONS;
}

const SOMERSAULT_KEY = '__somersault__';

function getSiteBasePath(siteId: string): string {
  const path =
    siteId.startsWith('http://') || siteId.startsWith('https://')
      ? new URL(siteId).pathname
      : siteId;
  const normalized = path.replace(/\/+$/, '');
  return normalized === '/' ? '' : normalized;
}

function toCanonicalPath(pathOrUrl: string, siteId: string): string {
  const pathname =
    pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')
      ? new URL(pathOrUrl).pathname
      : pathOrUrl;
  const normalized = normalizePath(pathname);
  const siteBasePath = getSiteBasePath(siteId);

  if (!siteBasePath) {
    return normalized;
  }
  if (normalized === siteBasePath) {
    return '/';
  }
  if (normalized.startsWith(`${siteBasePath}/`)) {
    return normalized.slice(siteBasePath.length);
  }

  return normalized;
}

export function normalizeContentResult(
  content: Content,
  siteId: string,
): ContentGetResult {
  const flattened = flattenToAppURL(content);
  const path = toCanonicalPath(flattened['@id'], siteId);
  return {
    item: {
      id: path,
      uid: flattened.UID,
      path,
      type: flattened['@type'],
      title: flattened.title,
      description: flattened.description,
      language:
        typeof flattened.language === 'string'
          ? flattened.language
          : ((flattened.language as { token?: string } | null)?.token ?? null),
      reviewState: flattened.review_state,
      modified: flattened.modified,
    },
    fields: {
      title: flattened.title,
      description: flattened.description,
    },
  };
}

export function normalizeSearchResult(
  items: Brain[],
  limit: number,
  total: number,
  siteId: string,
): ContentSearchResult {
  const flattened = flattenToAppURL(items);
  return {
    results: flattened.map((item: Brain) => ({
      uid: item.UID,
      path: toCanonicalPath(item['@id'], siteId),
      title: item.title,
      description: item.description,
      type: item['@type'],
      reviewState: item.review_state,
      modified: item.modified,
    })),
    total,
    limit,
  };
}

export function normalizeBlocksResult(
  content: Content,
  siteId: string,
): ContentGetBlocksResult {
  const flattened = flattenToAppURL(content);
  const path = toCanonicalPath(flattened['@id'], siteId);
  const blocks = flattened.blocks ?? {};
  const blocksLayout = flattened.blocks_layout ?? { items: [] };
  const somersaultBlock = blocks[SOMERSAULT_KEY] as
    | { value?: unknown[] | null }
    | undefined;
  const blockTypes = Array.from(
    new Set(
      Object.values(blocks)
        .map((block) =>
          typeof block?.['@type'] === 'string' ? block['@type'] : null,
        )
        .filter((value): value is string => !!value),
    ),
  ).sort();

  return {
    item: {
      id: path,
      uid: flattened.UID,
      path,
      type: flattened['@type'],
      title: flattened.title,
      reviewState: flattened.review_state,
      modified: flattened.modified,
    },
    blocks: {
      storage: {
        blocks,
        blocksLayout,
      },
      somersault: {
        present: !!somersaultBlock,
        value: Array.isArray(somersaultBlock?.value)
          ? somersaultBlock.value
          : null,
      },
      summary: {
        blockCount: Object.keys(blocks).length,
        blockTypes,
        hasSomersaultBlock: !!somersaultBlock,
      },
    },
  };
}

function normalizePath(path: string): string {
  if (!path.startsWith('/')) {
    return `/${path}`;
  }
  return path;
}

export async function resolveContentPath(args: {
  cli: PloneClient;
  siteId: string;
  identifier: ContentGetIdentifier;
}): Promise<string> {
  const keys = Object.entries(args.identifier).filter(([, value]) => !!value);
  if (keys.length !== 1) {
    throw new Error(
      'content.get expects exactly one identifier: path, uid, or url',
    );
  }

  const [kind, value] = keys[0] as [keyof ContentGetIdentifier, string];
  if (kind === 'path') {
    return normalizePath(value);
  }
  if (kind === 'url') {
    return toCanonicalPath(value, args.siteId);
  }

  const result = await args.cli.search({
    query: {
      UID: value,
      metadata_fields: ['UID', '@id'],
    },
  });
  const item = result.data.items[0];

  if (!item) {
    throw new Error(`No content found for UID ${value}`);
  }

  return toCanonicalPath(item['@id'], args.siteId);
}

export function buildSearchQuery(input: ContentSearchInput): {
  query: Record<string, unknown>;
  limit: number;
} {
  const limit = Math.min(Math.max(input.limit ?? 10, 1), 25);
  const query: Record<string, unknown> = {
    metadata_fields: [
      'UID',
      '@id',
      '@type',
      'title',
      'description',
      'review_state',
      'modified',
    ],
    b_size: limit,
  };

  if (input.query) {
    query.SearchableText = input.query;
  }
  if (input.path) {
    query.path = {
      query: normalizePath(input.path),
    };
  }
  if (input.types?.length) {
    query.portal_type = input.types;
  }
  if (input.reviewState?.length) {
    query.review_state = input.reviewState;
  }
  if (input.language) {
    query.Language = input.language;
  }

  switch (input.sort) {
    case 'modified_asc':
      query.sort_on = 'modified';
      query.sort_order = 'ascending';
      break;
    case 'title_asc':
      query.sort_on = 'sortable_title';
      query.sort_order = 'ascending';
      break;
    case 'title_desc':
      query.sort_on = 'sortable_title';
      query.sort_order = 'descending';
      break;
    case 'modified_desc':
    default:
      query.sort_on = 'modified';
      query.sort_order = 'descending';
      break;
  }

  return {
    query,
    limit,
  };
}

const CONTENT_UPDATE_EDITABLE_FIELDS = ['title', 'description'] as const;

export async function normalizeContentUpdateInput(args: {
  cli: PloneClient;
  siteId: string;
  input: ContentUpdateInput;
}): Promise<ContentUpdatePayload> {
  const path = await resolveContentPath({
    cli: args.cli,
    siteId: args.siteId,
    identifier: args.input.identifier,
  });
  const reason =
    typeof args.input.reason === 'string' ? args.input.reason.trim() : '';
  if (!reason) {
    throw new Error('content.update requires a non-empty reason');
  }

  const changes = Object.fromEntries(
    Object.entries(args.input.changes ?? {}).filter(([key, value]) => {
      return (
        CONTENT_UPDATE_EDITABLE_FIELDS.includes(
          key as (typeof CONTENT_UPDATE_EDITABLE_FIELDS)[number],
        ) && typeof value === 'string'
      );
    }),
  ) as ContentUpdatePayload['changes'];

  if (Object.keys(changes).length === 0) {
    throw new Error(
      'content.update requires at least one editable field: title or description',
    );
  }

  return {
    path,
    changes,
    reason,
  };
}

export function buildContentUpdatePreview(payload: ContentUpdatePayload): {
  summary: string;
  preview: Record<string, unknown>;
  contentRefs: Array<Record<string, unknown>>;
} {
  return {
    summary: `Update ${Object.keys(payload.changes).join(', ')} on ${payload.path}`,
    preview: {
      target: payload.path,
      changes: payload.changes,
      reason: payload.reason,
    },
    contentRefs: [
      {
        path: payload.path,
      },
    ],
  };
}

export function normalizeTypeSchema(
  schema: GetTypeResponse,
): SchemaGetTypeResult {
  return {
    type: {
      id: schema.type,
      title: schema.title,
    },
    schema: {
      required: schema.required,
      fieldsets: schema.fieldsets.map((fieldset) => ({
        id: fieldset.id,
        title: fieldset.title,
        description: fieldset.description ?? null,
        fields: fieldset.fields,
      })),
      fields: Object.fromEntries(
        Object.entries(schema.properties).map(([name, field]) => [
          name,
          {
            type: field.type,
            title: field.title,
            description: field.description ?? null,
            required: schema.required.includes(name),
            ...(field.default !== undefined ? { default: field.default } : {}),
            ...(field.enum ? { enum: field.enum } : {}),
            ...(field.choices
              ? {
                  choices: field.choices.map(([value, title]) => ({
                    value,
                    title,
                  })),
                }
              : {}),
            ...(field.vocabulary?.['@id']
              ? { vocabulary: field.vocabulary['@id'] }
              : {}),
            ...(field.widget ? { widget: field.widget } : {}),
          },
        ]),
      ),
    },
  };
}

function getSchemaDefaults(schema: JSONSchema | null): Record<string, unknown> {
  if (!schema) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(schema.properties ?? {})
      .filter(([, field]) => field?.default !== undefined)
      .map(([name, field]) => [name, field.default]),
  );
}

function resolveBlockSchema(block: BlockConfigBase): JSONSchema | null {
  if (!block.blockSchema) {
    return null;
  }

  return typeof block.blockSchema === 'function'
    ? block.blockSchema()
    : block.blockSchema;
}

export function buildBlocksRegistryResult(args?: {
  blockIds?: string[];
}): BlocksGetRegistryResult {
  const requestedBlockIds = args?.blockIds?.length
    ? new Set(args.blockIds)
    : null;
  const blocksConfig = config.blocks?.blocksConfig ?? {};
  const blocks = Object.values(blocksConfig as Record<string, BlockConfigBase>)
    .filter((block) => !!block?.id)
    .filter((block) => !requestedBlockIds || requestedBlockIds.has(block.id))
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((block) => {
      const schema = resolveBlockSchema(block);

      return {
        id: block.id,
        title: block.title,
        group: block.group ?? null,
        category: block.category ?? null,
        schema,
        defaults: getSchemaDefaults(schema),
        required: schema?.required ?? [],
        blockWidth: block.blockWidth ?? null,
      };
    });

  return { blocks };
}

export function buildSiteGetContextResult(args: {
  site: GetSiteResponse;
  conversation: MCPConversation;
  session: MCPSession;
  user: {
    id: string;
    fullname: string | null;
  };
}): SiteGetContextResult {
  const { site, session, user, conversation } = args;
  return {
    site: {
      id: site['@id'],
      title: site['plone.site_title'] ?? null,
      language: site['plone.default_language'] ?? null,
    },
    user: {
      id: user.id,
      fullname: user.fullname,
      isAuthenticated: true,
    },
    session: {
      conversationId: conversation.id,
      sessionId: session.id,
      scopes: session.scopes,
      approvalPolicy: session.approvalPolicy,
      status: session.status,
    },
    capabilities: {
      canReadContent: hasScope(session.scopes, 'content.read'),
      canSearchContent: hasScope(session.scopes, 'content.search'),
      canCreateContent: hasScope(session.scopes, 'content.write'),
      canUpdateContent: hasScope(session.scopes, 'content.write'),
      canApplyWorkflow: hasScope(session.scopes, 'workflow.write'),
    },
  };
}

export interface ExecuteMCPReadToolArgs {
  toolName: MCPReadToolName;
  input: Record<string, unknown>;
  cli: PloneClient;
  site: GetSiteResponse;
  siteId: string;
  conversation: MCPConversation;
  session: MCPSession;
  user: {
    id: string;
    fullname: string | null;
  };
}

export async function executeMCPReadTool(
  args: ExecuteMCPReadToolArgs,
): Promise<unknown> {
  if (args.toolName === 'site.get_context') {
    return buildSiteGetContextResult({
      site: args.site,
      conversation: args.conversation,
      session: args.session,
      user: args.user,
    });
  }

  if (args.toolName === 'content.get') {
    const path = await resolveContentPath({
      cli: args.cli,
      siteId: args.siteId,
      identifier: (args.input.identifier ?? {}) as ContentGetIdentifier,
    });
    const content = await args.cli.getContent({ path });
    return normalizeContentResult(content.data, args.siteId);
  }

  if (args.toolName === 'content.search') {
    const { query, limit } = buildSearchQuery(
      (args.input.query ?? {}) as ContentSearchInput,
    );
    const search = await args.cli.search({ query });
    return normalizeSearchResult(
      search.data.items,
      limit,
      search.data.items_total,
      args.siteId,
    );
  }

  if (args.toolName === 'content.get_blocks') {
    const path = await resolveContentPath({
      cli: args.cli,
      siteId: args.siteId,
      identifier: (args.input.identifier ?? {}) as ContentGetIdentifier,
    });
    const content = await args.cli.getContent({ path });
    return normalizeBlocksResult(content.data, args.siteId);
  }

  if (args.toolName === 'schema.get_type') {
    const type =
      typeof args.input.type === 'string' && args.input.type.trim().length > 0
        ? args.input.type.trim()
        : null;
    if (!type) {
      throw new Error('schema.get_type requires a non-empty type');
    }

    const schema = await args.cli.getType({ type });
    return normalizeTypeSchema(schema.data);
  }

  if (args.toolName === 'blocks.get_registry') {
    const blockIds = Array.isArray(args.input.blockIds)
      ? args.input.blockIds.filter(
          (blockId): blockId is string => typeof blockId === 'string',
        )
      : undefined;
    return buildBlocksRegistryResult({ blockIds });
  }

  throw new Error(`Unknown MCP read tool: ${args.toolName satisfies never}`);
}
