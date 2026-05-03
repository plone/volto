import { useState, type ChangeEvent } from 'react';
import {
  data,
  useLoaderData,
  useNavigate,
  type LoaderFunctionArgs,
  RouterContextProvider,
} from 'react-router';
import { requireAuthCookie } from '@plone/react-router';
import { flattenToAppURL } from '@plone/helpers';
import { ploneContentContext } from 'seven/app/config/plone-context';

type LoaderData = {
  contentPath: string;
  contentTitle: string;
};

function pretty(value: unknown): string {
  return JSON.stringify(value, null, 2);
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

function buildPresetPayload(tool: string, contentPath: string): string {
  switch (tool) {
    case 'content.get':
    case 'content.get_blocks':
      return pretty({
        identifier: {
          path: contentPath,
        },
      });
    case 'content.search':
      return pretty({
        query: {
          path: '/',
          limit: 5,
          sort: 'modified_desc',
        },
      });
    case 'schema.get_type':
      return pretty({
        type: 'Document',
      });
    case 'content.update':
      return pretty({
        identifier: {
          path: contentPath,
        },
        changes: {
          title: 'Updated title from MCP playground',
        },
        reason: 'Manual MCP playground test',
      });
    case 'blocks.get_registry':
    default:
      return pretty({
        blockIds: ['text', 'image', 'teaser'],
      });
  }
}

export default function MCPPlayground() {
  const { contentPath, contentTitle } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [toolName, setToolName] = useState('site.get_context');
  const [payload, setPayload] = useState('{}');
  const [token, setToken] = useState('');
  const [sessionData, setSessionData] = useState<unknown>(null);
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [pendingApproval, setPendingApproval] = useState<any>(null);
  const [busy, setBusy] = useState(false);

  function siteRelativeURL(path: string): string {
    return new URL(
      path,
      `${window.location.href.endsWith('/') ? window.location.href : `${window.location.href}/`}`,
    ).toString();
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
          title: 'MCP playground session',
        }),
      });
      const json = await readJSON(response);

      if (!response.ok) {
        throw new Error(json.message ?? 'Could not start MCP session');
      }

      setToken(json.token);
      setSessionData(json);
      setResult(json);
      setPendingApproval(null);
      setPayload(buildPresetPayload(toolName, contentPath));
    } catch (err: any) {
      setError(err?.message ?? 'Could not start MCP session');
    } finally {
      setBusy(false);
    }
  }

  async function runTool() {
    if (!token) {
      setError('Start an MCP session first.');
      return;
    }

    setBusy(true);
    setError(null);
    try {
      const parsedPayload = payload.trim() ? JSON.parse(payload) : {};
      const response = await fetch(
        siteRelativeURL(`../@mcp/tools/${toolName}`),
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(parsedPayload),
        },
      );
      const json = await readJSON(response);
      setResult(json);
      setPendingApproval(json.approval ?? null);

      if (!response.ok && response.status !== 202) {
        throw new Error(json.message ?? json.error?.message ?? 'Tool failed');
      }
    } catch (err: any) {
      setError(err?.message ?? 'Tool execution failed');
    } finally {
      setBusy(false);
    }
  }

  async function resolveApproval(decision: 'approved' | 'denied') {
    if (!token || !pendingApproval?.id) {
      setError('No pending approval to resolve.');
      return;
    }

    setBusy(true);
    setError(null);
    try {
      const response = await fetch(
        siteRelativeURL(`../@mcp/approvals/${pendingApproval.id}`),
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ decision }),
        },
      );
      const json = await readJSON(response);
      setResult(json);
      setPendingApproval(
        json.approval?.decision === 'pending' ? json.approval : null,
      );

      if (!response.ok) {
        throw new Error(json.message ?? 'Approval resolution failed');
      }
    } catch (err: any) {
      setError(err?.message ?? 'Approval resolution failed');
    } finally {
      setBusy(false);
    }
  }

  const presets = [
    'site.get_context',
    'content.get',
    'content.search',
    'content.get_blocks',
    'schema.get_type',
    'blocks.get_registry',
    'content.update',
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-neutral-500 uppercase">
            MCP Playground
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">
            Try the Seven MCP runtime
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-600">
            This is a thin internal playground for the current MCP backend. It
            exercises the real session, tool, and approval endpoints before we
            build the full chat UI.
          </p>
        </div>
        <button
          className={`
            rounded-md border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700
            hover:bg-neutral-50
          `}
          onClick={() => navigate('/')}
          type="button"
        >
          Back to site
        </button>
      </div>

      <div
        className={`
          mb-8 grid gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm
          md:grid-cols-[1.2fr_1fr]
        `}
      >
        <div>
          <h2 className="text-sm font-semibold text-neutral-900">
            Current context
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Content: <span className="font-medium">{contentTitle}</span>
          </p>
          <p className="mt-1 font-mono text-xs text-neutral-500">
            {contentPath}
          </p>
          <p className="mt-3 text-sm text-neutral-600">
            Start a session first, then run tools or resolve approvals.
          </p>
        </div>
        <div
          className={`
            flex items-center justify-start
            md:justify-end
          `}
        >
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
            {busy ? 'Working…' : 'Start MCP session'}
          </button>
        </div>
      </div>

      <div
        className={`
          grid gap-6
          lg:grid-cols-[1.1fr_0.9fr]
        `}
      >
        <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-neutral-900">
            Tool runner
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset}
                className={`
                  rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-medium
                  text-neutral-700
                  hover:bg-neutral-50
                `}
                onClick={() => {
                  setToolName(preset);
                  setPayload(buildPresetPayload(preset, contentPath));
                }}
                type="button"
              >
                {preset}
              </button>
            ))}
          </div>

          <label
            htmlFor="mcp-tool-name"
            className={`
              mt-5 block text-xs font-semibold tracking-[0.12em] text-neutral-500 uppercase
            `}
          >
            Tool
          </label>
          <input
            id="mcp-tool-name"
            className="mt-2 w-full rounded-md border border-neutral-300 px-3 py-2 font-mono text-sm"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setToolName((event.currentTarget as HTMLInputElement).value)
            }
            value={toolName}
          />

          <label
            htmlFor="mcp-tool-payload"
            className={`
              mt-5 block text-xs font-semibold tracking-[0.12em] text-neutral-500 uppercase
            `}
          >
            JSON payload
          </label>
          <textarea
            id="mcp-tool-payload"
            className={`
              mt-2 min-h-72 w-full rounded-xl border border-neutral-300 bg-neutral-950 p-4 font-mono
              text-sm text-neutral-100
            `}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setPayload((event.currentTarget as HTMLTextAreaElement).value)
            }
            value={payload}
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              className={`
                rounded-md bg-neutral-950 px-4 py-2 text-sm font-medium text-white
                hover:bg-neutral-800
                disabled:opacity-50
              `}
              disabled={busy || !token}
              onClick={() => void runTool()}
              type="button"
            >
              Run tool
            </button>
            <button
              className={`
                rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700
                hover:bg-neutral-50
              `}
              onClick={() =>
                setPayload(buildPresetPayload(toolName, contentPath))
              }
              type="button"
            >
              Reset payload
            </button>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-neutral-900">Session</h2>
            <pre
              className={`
                mt-3 overflow-x-auto rounded-xl bg-neutral-950 p-4 text-xs leading-6
                text-neutral-100
              `}
            >
              {sessionData ? pretty(sessionData) : 'No session yet.'}
            </pre>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-neutral-900">Approval</h2>
            {pendingApproval ? (
              <>
                <pre
                  className={`
                    mt-3 overflow-x-auto rounded-xl bg-amber-50 p-4 text-xs leading-6 text-amber-950
                  `}
                >
                  {pretty(pendingApproval)}
                </pre>
                <div className="mt-4 flex gap-3">
                  <button
                    className={`
                      rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white
                      hover:bg-emerald-600
                      disabled:opacity-50
                    `}
                    disabled={busy}
                    onClick={() => void resolveApproval('approved')}
                    type="button"
                  >
                    Approve
                  </button>
                  <button
                    className={`
                      rounded-md bg-rose-700 px-4 py-2 text-sm font-medium text-white
                      hover:bg-rose-600
                      disabled:opacity-50
                    `}
                    disabled={busy}
                    onClick={() => void resolveApproval('denied')}
                    type="button"
                  >
                    Deny
                  </button>
                </div>
              </>
            ) : (
              <p className="mt-3 text-sm text-neutral-600">
                No pending approval.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-neutral-900">Result</h2>
            {error ? (
              <div
                className={`
                  mt-3 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800
                `}
              >
                {error}
              </div>
            ) : null}
            <pre
              className={`
                mt-3 overflow-x-auto rounded-xl bg-neutral-950 p-4 text-xs leading-6
                text-neutral-100
              `}
            >
              {result ? pretty(result) : 'No result yet.'}
            </pre>
          </div>
        </section>
      </div>
    </main>
  );
}
