import {
  data,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  RouterContextProvider,
} from 'react-router';
import { jwtDecode } from 'jwt-decode';
import { requireAuthCookie } from '@plone/react-router';
import { getMCPPersistence } from 'seven/app/config/mcp.server';
import { ploneClientContext } from 'seven/app/config/plone-context';
import { ensurePendingApproval } from '../approval.server';
import { authenticateMCPSessionRequest } from '../auth.server';
import { normalizeContentResult } from '../tools.server';

type TokenClaims = {
  sub?: string;
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    const persistence = getMCPPersistence();
    const authenticated = await authenticateMCPSessionRequest(
      request as Request,
      persistence,
    );
    const approvalId = params['*']?.replace(/\/+$/, '');
    if (!approvalId) {
      return data(
        {
          message: 'Missing approval id',
        },
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    const approval = await persistence.getApproval(approvalId);
    if (
      !approval ||
      approval.conversationId !== authenticated.session.conversationId
    ) {
      return data(
        {
          message: 'Approval request not found',
        },
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    return data(approval, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    return data(
      {
        message: error?.message ?? 'Could not inspect approval request',
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

export async function action({
  request,
  params,
  context,
}: ActionFunctionArgs<RouterContextProvider>) {
  try {
    const persistence = getMCPPersistence();
    const authenticated = await authenticateMCPSessionRequest(
      request as Request,
      persistence,
    );
    const approvalId = params['*']?.replace(/\/+$/, '');
    if (!approvalId) {
      return data(
        {
          message: 'Missing approval id',
        },
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    const token = await requireAuthCookie(request as Request);
    const decoded = jwtDecode<TokenClaims>(token);
    const userId = decoded.sub ?? authenticated.session.userId;
    const approval = await ensurePendingApproval({
      persistence,
      approvalId,
    });

    if (approval.sessionId !== authenticated.session.id) {
      return data(
        {
          message:
            'Approval request does not belong to the current MCP session',
        },
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    const body = (await request.json().catch(() => ({}))) as {
      decision?: 'approved' | 'denied';
    };
    const decision =
      body.decision === 'approved' || body.decision === 'denied'
        ? body.decision
        : null;

    if (!decision) {
      return data(
        {
          message: 'Approval decision must be approved or denied',
        },
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    if (decision === 'denied') {
      const denied = await persistence.decideApproval({
        id: approval.id,
        decision: 'denied',
        decidedBy: userId,
      });
      await persistence.touchSession(authenticated.session.id, {
        status: 'active',
      });
      await persistence.appendEvent({
        conversationId: approval.conversationId,
        sessionId: approval.sessionId,
        eventType: 'approval_denied',
        actorType: 'user',
        actorId: userId,
        payload: {
          approvalId: approval.id,
          tool: approval.toolName,
        },
        summary: `Denied approval for ${approval.toolName}`,
        contentRefs: approval.contentRefs,
      });

      return data(
        {
          approval: denied,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    const cli = context.get(ploneClientContext);

    switch (approval.toolName) {
      case 'content.update': {
        const payload = approval.payload as {
          path: string;
          changes: Record<string, unknown>;
          reason: string;
        };

        const updated = await cli.updateContent({
          path: payload.path,
          data: payload.changes,
        });
        const decided = await persistence.decideApproval({
          id: approval.id,
          decision: 'approved',
          decidedBy: userId,
        });
        await persistence.touchSession(authenticated.session.id, {
          status: 'active',
        });
        await persistence.appendEvent({
          conversationId: approval.conversationId,
          sessionId: approval.sessionId,
          eventType: 'approval_granted',
          actorType: 'user',
          actorId: userId,
          payload: {
            approvalId: approval.id,
            tool: approval.toolName,
          },
          summary: `Approved ${approval.toolName}`,
          contentRefs: approval.contentRefs,
        });
        await persistence.appendEvent({
          conversationId: approval.conversationId,
          sessionId: approval.sessionId,
          eventType: 'tool_call_completed',
          actorType: 'system',
          actorId: authenticated.session.userId,
          payload: {
            tool: approval.toolName,
            approvalId: approval.id,
          },
          summary: `Completed tool ${approval.toolName}`,
          contentRefs: approval.contentRefs,
        });

        return data(
          {
            approval: decided,
            result: normalizeContentResult(
              updated.data,
              authenticated.session.siteId,
            ),
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      }

      default:
        return data(
          {
            message: `Approval execution is not implemented for ${approval.toolName}`,
          },
          {
            status: 501,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
    }
  } catch (error: any) {
    return data(
      {
        message: error?.message ?? 'Could not resolve approval request',
      },
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
