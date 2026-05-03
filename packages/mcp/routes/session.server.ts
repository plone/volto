import {
  data,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  RouterContextProvider,
} from 'react-router';
import { jwtDecode } from 'jwt-decode';
import { requireAuthCookie } from '@plone/react-router';
import { ploneClientContext } from 'seven/app/config/plone-context';
import {
  bootstrapAuthenticatedMCPSession,
  getMCPPersistence,
} from 'seven/app/config/mcp.server';
import { authenticateMCPSessionRequest } from '../auth.server';

type StartSessionRequest = {
  conversationId?: string;
  title?: string | null;
};

type TokenClaims = {
  sub?: string;
  fullname?: string | null;
};

export async function loader({ request }: LoaderFunctionArgs) {
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

    const sessions = await persistence.listSessions(conversation.id);
    const events = await persistence.listEvents(conversation.id);

    return data(
      {
        conversation,
        session: authenticated.session,
        sessions,
        eventCount: events.length,
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
        message: error?.message ?? 'Could not inspect MCP session',
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
  context,
}: ActionFunctionArgs<RouterContextProvider>) {
  const token = await requireAuthCookie(request);
  const decoded = jwtDecode<TokenClaims>(token);
  const userId = decoded.sub;

  if (!userId) {
    return data(
      {
        message: 'The authenticated Plone token does not contain a user id',
      },
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  const cli = context.get(ploneClientContext);
  const body = (await request.json().catch(() => ({}))) as StartSessionRequest;
  const site = await cli.getSite();

  const result = await bootstrapAuthenticatedMCPSession({
    userId,
    siteId: site.data['@id'],
    siteTitle: site.data['plone.site_title'],
    conversationId: body.conversationId,
    conversationTitle: body.title ?? null,
    issuer: new URL(request.url).origin,
  });

  return data(
    {
      conversation: result.conversation,
      session: result.session,
      token: result.token,
      expiresAt: result.expiresAt,
      user: {
        id: userId,
        fullname: decoded.fullname ?? null,
      },
      site: {
        id: site.data['@id'],
        title: site.data['plone.site_title'] ?? null,
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}
