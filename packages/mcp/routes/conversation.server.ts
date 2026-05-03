import {
  data,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  RouterContextProvider,
} from 'react-router';
import { authenticateMCPSessionRequest } from '../auth.server';
import { getMCPPersistence } from 'seven/app/config/mcp.server';

function getConversationId(
  params: Record<string, string | undefined>,
): string | null {
  return params.id ?? params['*']?.replace(/\/+$/, '') ?? null;
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  try {
    const persistence = getMCPPersistence();
    const authenticated = await authenticateMCPSessionRequest(
      request as Request,
      persistence,
    );

    const conversationId = getConversationId(params);

    if (!conversationId) {
      const conversations = await persistence.listConversations({
        userId: authenticated.session.userId,
        siteId: authenticated.session.siteId,
      });

      return data(
        {
          conversations,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    const conversation = await persistence.getConversation(conversationId);
    if (
      !conversation ||
      conversation.userId !== authenticated.session.userId ||
      conversation.siteId !== authenticated.session.siteId
    ) {
      return data(
        {
          message: 'Conversation not found',
        },
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    const events = await persistence.listEvents(conversation.id);
    const sessions = await persistence.listSessions(conversation.id);

    return data(
      {
        conversation,
        session: authenticated.session,
        sessions,
        events,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error: any) {
    return data(
      {
        message: error?.message ?? 'Could not load MCP conversation',
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
}: ActionFunctionArgs<RouterContextProvider>) {
  try {
    const persistence = getMCPPersistence();
    const authenticated = await authenticateMCPSessionRequest(
      request as Request,
      persistence,
    );
    const conversationId = getConversationId(params);

    if (!conversationId) {
      return data(
        {
          message: 'Missing conversation id',
        },
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    const conversation = await persistence.getConversation(conversationId);
    if (
      !conversation ||
      conversation.userId !== authenticated.session.userId ||
      conversation.siteId !== authenticated.session.siteId
    ) {
      return data(
        {
          message: 'Conversation not found',
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
          message: 'A non-empty message is required',
        },
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }

    const event = await persistence.appendEvent({
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

    return data(
      {
        event,
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
        message: error?.message ?? 'Could not append MCP message',
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
