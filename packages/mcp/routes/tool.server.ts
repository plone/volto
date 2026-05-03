import {
  data,
  type ActionFunctionArgs,
  RouterContextProvider,
} from 'react-router';
import { jwtDecode } from 'jwt-decode';
import { requireAuthCookie } from '@plone/react-router';
import { getMCPPersistence } from 'seven/app/config/mcp.server';
import { ploneClientContext } from 'seven/app/config/plone-context';
import { getApprovalExpiry, hashApprovalPayload } from '../approval.server';
import { authenticateMCPSessionRequest } from '../auth.server';
import {
  buildContentUpdatePreview,
  executeMCPReadTool,
  getMCPReadToolDefinitions,
  normalizeContentUpdateInput,
} from '../tools.server';

type TokenClaims = {
  sub?: string;
  fullname?: string | null;
};

export async function action({
  request,
  params,
  context,
}: ActionFunctionArgs<RouterContextProvider>) {
  const toolName = params['*']?.replace(/\/+$/, '');

  try {
    const persistence = getMCPPersistence();
    const authenticated = await authenticateMCPSessionRequest(
      request as Request,
      persistence,
    );
    const conversation = await persistence.getConversation(
      authenticated.session.conversationId,
    );

    if (!conversation) {
      return data(
        {
          message: 'Conversation not found for MCP session',
        },
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    const ploneToken = await requireAuthCookie(request as Request);
    const decoded = jwtDecode<TokenClaims>(ploneToken);
    const cli = context.get(ploneClientContext);
    const body = (await request.json().catch(() => ({}))) as Record<
      string,
      unknown
    >;

    const readTool = getMCPReadToolDefinitions().find(
      (candidate) => candidate.name === toolName,
    );

    if (readTool) {
      if (!authenticated.session.scopes.includes(readTool.requiredScope)) {
        return data(
          {
            message: `MCP session does not allow ${toolName}`,
          },
          {
            status: 403,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      }

      const site = await cli.getSite();
      const result = await executeMCPReadTool({
        toolName: readTool.name,
        input: body,
        cli,
        site: site.data,
        siteId: authenticated.session.siteId,
        conversation,
        session: authenticated.session,
        user: {
          id: decoded.sub ?? authenticated.claims.sub,
          fullname: decoded.fullname ?? null,
        },
      });

      await persistence.appendEvent({
        conversationId: conversation.id,
        sessionId: authenticated.session.id,
        eventType: 'tool_call_requested',
        actorType: 'system',
        actorId: authenticated.session.userId,
        payload: {
          tool: toolName,
          input: body,
        },
        summary: `Requested tool ${toolName}`,
      });
      await persistence.appendEvent({
        conversationId: conversation.id,
        sessionId: authenticated.session.id,
        eventType: 'tool_call_completed',
        actorType: 'system',
        actorId: authenticated.session.userId,
        payload: {
          tool: toolName,
          input: body,
          result,
        },
        summary: `Completed tool ${toolName}`,
      });

      return data(result, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    switch (toolName) {
      case 'content.update': {
        if (!authenticated.session.scopes.includes('content.write')) {
          return data(
            {
              message: 'MCP session does not allow content.update',
            },
            {
              status: 403,
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
        }

        const normalized = await normalizeContentUpdateInput({
          cli,
          siteId: authenticated.session.siteId,
          input: {
            identifier: (body.identifier ?? {}) as {
              path?: string;
              uid?: string;
              url?: string;
            },
            changes: (body.changes ?? {}) as Record<string, unknown>,
            reason: typeof body.reason === 'string' ? body.reason : undefined,
          },
        });
        const { summary, preview, contentRefs } =
          buildContentUpdatePreview(normalized);
        const approvalPayload: Record<string, unknown> = {
          path: normalized.path,
          changes: normalized.changes,
          reason: normalized.reason,
        };
        await persistence.appendEvent({
          conversationId: conversation.id,
          sessionId: authenticated.session.id,
          eventType: 'tool_call_requested',
          actorType: 'system',
          actorId: authenticated.session.userId,
          payload: {
            tool: 'content.update',
          },
          summary: 'Requested tool content.update',
          contentRefs,
        });
        const approval = await persistence.createApproval({
          conversationId: conversation.id,
          sessionId: authenticated.session.id,
          toolName: 'content.update',
          expiresAt: getApprovalExpiry(),
          payloadHash: hashApprovalPayload(approvalPayload),
          summary,
          preview,
          payload: approvalPayload,
          contentRefs,
        });
        await persistence.touchSession(authenticated.session.id, {
          status: 'waiting_for_approval',
        });
        await persistence.appendEvent({
          conversationId: conversation.id,
          sessionId: authenticated.session.id,
          eventType: 'approval_requested',
          actorType: 'system',
          actorId: authenticated.session.userId,
          payload: {
            approvalId: approval.id,
            tool: 'content.update',
            preview,
          },
          summary,
          contentRefs,
        });

        return data(
          {
            error: {
              code: 'approval_required',
              message: 'content.update requires approval before execution',
              retryable: false,
            },
            approval,
          },
          {
            status: 202,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      }

      default:
        return data(
          {
            message: `Unknown MCP tool: ${toolName ?? '<missing>'}`,
          },
          {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
    }

    return data(
      {
        message: `Unknown MCP tool: ${toolName ?? '<missing>'}`,
      },
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error: any) {
    return data(
      {
        message: error?.message ?? 'Could not execute MCP tool',
      },
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
