import type PloneClient from '@plone/client';
import type { GetSiteResponse } from '@plone/types';
import type {
  MCPConversation,
  MCPConversationEvent,
  MCPSession,
} from './types.ts';
import type { MCPPersistence } from './persistence.server.ts';
import {
  executeMCPReadTool,
  getMCPReadToolDefinitions,
  type MCPReadToolName,
} from './tools.server.ts';

export interface MCPChatTurnInput {
  conversation: MCPConversation;
  session: MCPSession;
  events: MCPConversationEvent[];
  message: string;
  runtime: MCPChatRuntime;
}

export interface MCPChatTurnResult {
  text: string;
  metadata?: Record<string, unknown>;
}

export interface MCPChatToolCall {
  name: MCPReadToolName;
  description: string;
  inputSchema: Record<string, unknown>;
}

export interface MCPChatRuntime {
  tools: MCPChatToolCall[];
  executeTool(
    name: MCPReadToolName,
    input: Record<string, unknown>,
  ): Promise<unknown>;
}

export interface MCPChatProvider {
  sendTurn(input: MCPChatTurnInput): Promise<MCPChatTurnResult>;
}

type OllamaToolCall = {
  function: {
    name: string;
    arguments: Record<string, unknown>;
  };
};

type OllamaMessage = {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content?: string;
  tool_name?: string;
  tool_calls?: Array<{
    type: 'function';
    function: {
      name: string;
      arguments: Record<string, unknown>;
    };
  }>;
};

type OllamaChatResponse = {
  message?: {
    role?: 'assistant';
    content?: string;
    tool_calls?: OllamaToolCall[];
  };
  done?: boolean;
};

class NoopChatProvider implements MCPChatProvider {
  async sendTurn(): Promise<MCPChatTurnResult> {
    throw new Error('No MCP chat provider is configured');
  }
}

let providerOverride: MCPChatProvider | null = null;

export function setMCPChatProvider(nextProvider: MCPChatProvider | null) {
  providerOverride = nextProvider;
}

export function getMCPChatProvider(): MCPChatProvider {
  if (providerOverride) {
    return providerOverride;
  }

  if ((process.env.MCP_CHAT_PROVIDER ?? '').trim().toLowerCase() === 'ollama') {
    return createOllamaChatProvider();
  }

  return new NoopChatProvider();
}

function getOllamaBaseURL(): string {
  return (process.env.MCP_OLLAMA_BASE_URL ?? 'http://127.0.0.1:11434').replace(
    /\/+$/,
    '',
  );
}

function getOllamaModel(): string {
  const model = process.env.MCP_OLLAMA_MODEL ?? process.env.OLLAMA_MODEL;
  if (!model?.trim()) {
    throw new Error(
      'MCP_OLLAMA_MODEL (or OLLAMA_MODEL) is required when MCP_CHAT_PROVIDER=ollama',
    );
  }
  return model.trim();
}

function buildSystemPrompt(runtime: MCPChatRuntime): string {
  const toolNames = runtime.tools.map((tool) => tool.name).join(', ');
  return [
    'You are the Seven MCP assistant for a Plone site.',
    'Use the available tools when you need site context, content, schema, or block information.',
    'Prefer concise answers grounded in tool results.',
    `Available tools: ${toolNames}.`,
    'Only call tools that are necessary to answer the user.',
  ].join(' ');
}

function conversationEventsToMessages(
  events: MCPConversationEvent[],
): OllamaMessage[] {
  const messages: OllamaMessage[] = [];

  for (const event of events) {
    if (event.eventType === 'user_message') {
      const text =
        typeof event.payload?.text === 'string'
          ? event.payload.text
          : (event.summary ?? '');
      if (text) {
        messages.push({ role: 'user', content: text });
      }
      continue;
    }

    if (event.eventType === 'assistant_message') {
      const text =
        typeof event.payload?.text === 'string'
          ? event.payload.text
          : (event.summary ?? '');
      if (text) {
        messages.push({ role: 'assistant', content: text });
      }
    }
  }

  return messages;
}

function stringifyToolResult(result: unknown): string {
  if (typeof result === 'string') {
    return result;
  }

  return JSON.stringify(result, null, 2);
}

export function createOllamaChatProvider(
  fetchImpl: typeof fetch = fetch,
): MCPChatProvider {
  return {
    async sendTurn(input) {
      const messages: OllamaMessage[] = [
        {
          role: 'system',
          content: buildSystemPrompt(input.runtime),
        },
        ...conversationEventsToMessages(input.events),
      ];

      const tools = input.runtime.tools.map((tool) => ({
        type: 'function' as const,
        function: {
          name: tool.name,
          description: tool.description,
          parameters: tool.inputSchema,
        },
      }));

      const maxIterations = 5;

      for (let iteration = 0; iteration < maxIterations; iteration += 1) {
        const response = await fetchImpl(`${getOllamaBaseURL()}/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: getOllamaModel(),
            messages,
            tools,
            stream: false,
          }),
        });

        let json: OllamaChatResponse | null = null;
        try {
          json = (await response.json()) as OllamaChatResponse;
        } catch {
          json = null;
        }

        if (!response.ok || !json?.message) {
          throw new Error('Ollama chat request failed');
        }

        const message = json.message;
        const toolCalls = message.tool_calls ?? [];

        messages.push({
          role: 'assistant',
          content: message.content ?? '',
          ...(toolCalls.length
            ? {
                tool_calls: toolCalls.map((call) => ({
                  type: 'function' as const,
                  function: {
                    name: call.function.name,
                    arguments: call.function.arguments ?? {},
                  },
                })),
              }
            : {}),
        });

        if (!toolCalls.length) {
          return {
            text: (message.content ?? '').trim(),
            metadata: {
              provider: 'ollama',
              model: getOllamaModel(),
            },
          };
        }

        for (const call of toolCalls) {
          const toolName = call.function.name as MCPReadToolName;
          const result = await input.runtime.executeTool(
            toolName,
            call.function.arguments ?? {},
          );
          messages.push({
            role: 'tool',
            tool_name: toolName,
            content: stringifyToolResult(result),
          });
        }
      }

      throw new Error('Ollama tool loop exceeded the maximum number of turns');
    },
  };
}

export async function createMCPChatRuntime(args: {
  cli: PloneClient;
  site: GetSiteResponse;
  siteId: string;
  conversation: MCPConversation;
  session: MCPSession;
  user: {
    id: string;
    fullname: string | null;
  };
  persistence: MCPPersistence;
}): Promise<MCPChatRuntime> {
  const tools = getMCPReadToolDefinitions()
    .filter((tool) => args.session.scopes.includes(tool.requiredScope))
    .map((tool) => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
    }));

  return {
    tools,
    executeTool: async (name, input) => {
      const tool = tools.find((candidate) => candidate.name === name);
      if (!tool) {
        throw new Error(`MCP tool is not available in this session: ${name}`);
      }

      await args.persistence.appendEvent({
        conversationId: args.conversation.id,
        sessionId: args.session.id,
        eventType: 'tool_call_requested',
        actorType: 'assistant',
        actorId: null,
        payload: {
          tool: name,
          input,
        },
        summary: `Requested tool ${name}`,
      });

      try {
        const result = await executeMCPReadTool({
          toolName: name,
          input,
          cli: args.cli,
          site: args.site,
          siteId: args.siteId,
          conversation: args.conversation,
          session: args.session,
          user: args.user,
        });

        await args.persistence.appendEvent({
          conversationId: args.conversation.id,
          sessionId: args.session.id,
          eventType: 'tool_call_completed',
          actorType: 'system',
          actorId: args.session.userId,
          payload: {
            tool: name,
            input,
            result,
          },
          summary: `Completed tool ${name}`,
        });

        return result;
      } catch (error: any) {
        await args.persistence.appendEvent({
          conversationId: args.conversation.id,
          sessionId: args.session.id,
          eventType: 'tool_call_failed',
          actorType: 'system',
          actorId: args.session.userId,
          payload: {
            tool: name,
            input,
            message: error?.message ?? 'Tool execution failed',
          },
          summary: `Tool ${name} failed`,
        });
        throw error;
      }
    },
  };
}
