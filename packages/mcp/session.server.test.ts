import { describe, expect, it } from 'vitest';
import { mkdtemp, readFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { FileMCPPersistence } from './file-storage.server';
import { bootstrapMCPSession } from './session.server';

describe('bootstrapMCPSession', () => {
  it('creates a conversation, live session, and persisted session event', async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), 'plone-mcp-'));
    const persistence = new FileMCPPersistence(path.join(dir, 'state.json'));

    const result = await bootstrapMCPSession({
      persistence,
      userId: 'admin',
      siteId: 'http://localhost:8080/Plone',
      siteTitle: 'Plone',
    });

    expect(result.conversation.userId).toBe('admin');
    expect(result.session.userId).toBe('admin');
    expect(result.session.scopes).toContain('content.write');
    expect(result.token).toContain('.');

    const saved = JSON.parse(
      await readFile(path.join(dir, 'state.json'), 'utf8'),
    ) as {
      conversations: unknown[];
      sessions: Array<{ tokenJti: string }>;
      events: Array<{ eventType: string }>;
    };

    expect(saved.conversations).toHaveLength(1);
    expect(saved.sessions[0].tokenJti).not.toBe('pending');
    expect(saved.events.at(-1)?.eventType).toBe('session_started');
  });
});
