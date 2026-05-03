import {
  data,
  type ActionFunctionArgs,
  RouterContextProvider,
} from 'react-router';
import { jwtDecode } from 'jwt-decode';
import { authenticateMCPSessionRequest } from '../auth.server';
import { getMCPPersistence } from 'seven/app/config/mcp.server';
import { requireAuthCookie } from '@plone/react-router';
import { ploneClientContext } from 'seven/app/config/plone-context';
import { createMCPChatRuntime, getMCPChatProvider } from '../chat.server';

type TokenClaims = {
  sub?: string;
  fullname?: string | null;
};

export async function action({
  request,
  context,
}: ActionFunctionArgs<RouterContextProvider>) {
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

    const body = (await request.json().catch(() => ({}))) as {
      message?: string;
    };
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!message) {
      return data(
        {
          message: 'A non-empty chat message is required',
        },
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    const userEvent = await persistence.appendEvent({
      conversationId: conversation.id,
      sessionId: authenticated.session.id,
      eventType: 'user_message',
      actorType: 'user',
      actorId: authenticated.session.userId,
      payload: {
        text: message,
      },
      summary: message,
    });

    const events = await persistence.listEvents(conversation.id);
    const ploneToken = await requireAuthCookie(request as Request);
    const decoded = jwtDecode<TokenClaims>(ploneToken);
    const cli = context.get(ploneClientContext);
    const site = await cli.getSite();
    const runtime = await createMCPChatRuntime({
      cli,
      site: site.data,
      siteId: authenticated.session.siteId,
      conversation,
      session: authenticated.session,
      user: {
        id: decoded.sub ?? authenticated.claims.sub,
        fullname: decoded.fullname ?? null,
      },
      persistence,
    });

    try {
      const provider = getMCPChatProvider();
      const result = await provider.sendTurn({
        conversation,
        session: authenticated.session,
        events,
        message,
        runtime,
      });

      const assistantEvent = await persistence.appendEvent({
        conversationId: conversation.id,
        sessionId: authenticated.session.id,
        eventType: 'assistant_message',
        actorType: 'assistant',
        actorId: null,
        payload: {
          text: result.text,
          metadata: result.metadata ?? {},
        },
        summary: result.text,
      });

      return data(
        {
          userEvent,
          assistantEvent,
        },
        {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error: any) {
      return data(
        {
          message: error?.message ?? 'Could not execute MCP chat turn',
          userEvent,
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
        message: error?.message ?? 'Could not execute MCP chat route',
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
