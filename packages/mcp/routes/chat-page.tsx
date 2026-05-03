import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  data,
  type LoaderFunctionArgs,
  RouterContextProvider,
  useLoaderData,
} from 'react-router';
import { requireAuthCookie } from '@plone/react-router';
import { flattenToAppURL } from '@plone/helpers';
import { ploneContentContext } from 'seven/app/config/plone-context';

type LoaderData = {
  contentPath: string;
  contentTitle: string;
};

type SessionResponse = {
  conversation: {
    id: string;
  };
  token: string;
};

type ConversationEvent = {
  id: string;
  eventType: string;
  payload?: Record<string, any>;
  summary?: string | null;
};

const SESSION_STORAGE_KEY = 'plone.mcp.chat.session';

function siteRelativeURL(path: string): string {
  return new URL(
    path,
    `${window.location.href.endsWith('/') ? window.location.href : `${window.location.href}/`}`,
  ).toString();
}

async function readJSON(response: Response): Promise<Record<string, any>> {
  try {
    return (await response.json()) as Record<string, any>;
  } catch {
    return {
      message: `Unexpected response from ${response.url}`,
    };
  }
}

export async function loader({
  request,
  context,
}: LoaderFunctionArgs<RouterContextProvider>) {
  await requireAuthCookie(request);

  const content = flattenToAppURL(context.get(ploneContentContext));
  const contentPath = content?.['@id'] || '/';
  const contentTitle = content?.title || 'Current content';

  return data<LoaderData>({
    contentPath,
    contentTitle,
  });
}

export default function MCPChatPage() {
  const { contentPath, contentTitle } = useLoaderData<typeof loader>();
  const [token, setToken] = useState('');
  const [conversationId, setConversationId] = useState('');
  const [messages, setMessages] = useState<ConversationEvent[]>([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const visibleMessages = useMemo(
    () =>
      messages.filter(
        (event) =>
          event.eventType === 'user_message' ||
          event.eventType === 'assistant_message',
      ),
    [messages],
  );

  useEffect(() => {
    const raw = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return;

    try {
      const saved = JSON.parse(raw) as {
        token?: string;
        conversationId?: string;
      };

      if (saved.token) {
        setToken(saved.token);
      }
      if (saved.conversationId) {
        setConversationId(saved.conversationId);
      }

      if (saved.token && saved.conversationId) {
        void refreshConversation(saved.token, saved.conversationId).catch(
          (err: any) => {
            setError(err?.message ?? 'Could not restore chat session');
          },
        );
      }
    } catch {
      window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!token || !conversationId) {
      window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
      return;
    }

    window.sessionStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify({
        token,
        conversationId,
      }),
    );
  }, [token, conversationId]);

  async function refreshConversation(
    nextToken = token,
    nextConversationId = conversationId,
  ) {
    if (!nextToken || !nextConversationId) return;

    const response = await fetch(
      siteRelativeURL(`../@mcp/conversations/${nextConversationId}`),
      {
        headers: {
          Authorization: `Bearer ${nextToken}`,
        },
      },
    );
    const json = await readJSON(response);

    if (!response.ok) {
      throw new Error(json.message ?? 'Could not load conversation');
    }

    setMessages((json.events ?? []) as ConversationEvent[]);
  }

  async function startSession() {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(siteRelativeURL('../@mcp/session'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `Chat for ${contentTitle}`,
        }),
      });
      const json = (await readJSON(response)) as SessionResponse &
        Record<string, any>;

      if (!response.ok) {
        throw new Error(json.message ?? 'Could not start MCP session');
      }

      setToken(json.token);
      setConversationId(json.conversation.id);
      await refreshConversation(json.token, json.conversation.id);
    } catch (err: any) {
      setError(err?.message ?? 'Could not start chat session');
    } finally {
      setBusy(false);
    }
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!token || !conversationId) {
      setError('Start a chat session first.');
      return;
    }

    const message = input.trim();
    if (!message) return;

    setBusy(true);
    setError(null);
    try {
      const response = await fetch(siteRelativeURL('../@mcp/chat'), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
        }),
      });
      const json = await readJSON(response);

      if (!response.ok && response.status !== 501) {
        throw new Error(json.message ?? 'Could not send chat turn');
      }

      setInput('');
      await refreshConversation();

      if (response.status === 501) {
        setError(json.message ?? 'No chat provider configured');
      }
    } catch (err: any) {
      setError(err?.message ?? 'Could not send chat turn');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10">
      <header className="mb-8">
        <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-neutral-500 uppercase">
          MCP Chat
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">
          Seven-native MCP chat
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-600">
          This is the first chat UI on top of the MCP runtime. It is independent
          from Plate and uses MCP sessions, conversation history, and the chat
          turn endpoint directly.
        </p>
        <p className="mt-3 font-mono text-xs text-neutral-500">
          Context: {contentPath} ({contentTitle})
        </p>
      </header>

      <div className="mb-6 flex items-center gap-3">
        <button
          className={`
            rounded-md bg-neutral-950 px-4 py-2 text-sm font-medium text-white
            hover:bg-neutral-800
            disabled:opacity-50
          `}
          disabled={busy}
          onClick={() => void startSession()}
          type="button"
        >
          {busy ? 'Working…' : 'Start chat session'}
        </button>
        {conversationId ? (
          <p className="font-mono text-xs text-neutral-500">{conversationId}</p>
        ) : null}
      </div>

      {error ? (
        <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
          {error}
        </div>
      ) : null}

      <section
        className={`
          flex min-h-[24rem] flex-1 flex-col rounded-2xl border border-neutral-200 bg-white
          shadow-sm
        `}
      >
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {visibleMessages.length === 0 ? (
            <p className="text-sm text-neutral-500">
              No messages yet. Start a session and send the first turn.
            </p>
          ) : (
            visibleMessages.map((event) => {
              const isUser = event.eventType === 'user_message';
              const text =
                event.payload?.text ??
                event.payload?.message ??
                event.summary ??
                '';

              return (
                <div
                  key={event.id}
                  className={`
                    max-w-3xl rounded-2xl px-4 py-3 text-sm leading-6
                    ${
                      isUser
                        ? 'ml-auto bg-neutral-950 text-white'
                        : 'bg-neutral-100 text-neutral-900'
                    }
                  `}
                >
                  {text}
                </div>
              );
            })
          )}
        </div>

        <form
          className="border-t border-neutral-200 p-4"
          onSubmit={(event) => void sendMessage(event)}
        >
          <label className="sr-only" htmlFor="mcp-chat-input">
            Chat message
          </label>
          <div className="flex gap-3">
            <input
              id="mcp-chat-input"
              className="flex-1 rounded-xl border border-neutral-300 px-4 py-3 text-sm"
              onChange={(event) => setInput(event.currentTarget.value)}
              placeholder="Ask the MCP assistant something…"
              value={input}
            />
            <button
              className={`
                rounded-xl bg-neutral-950 px-4 py-3 text-sm font-medium text-white
                hover:bg-neutral-800
                disabled:opacity-50
              `}
              disabled={busy || !token}
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
