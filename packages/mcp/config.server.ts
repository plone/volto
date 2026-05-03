import {
  FileMCPPersistence,
  defaultMCPStorageFile,
} from './file-storage.server.ts';
import type { MCPPersistence } from './persistence.server.ts';

export function createMCPPersistence(): MCPPersistence {
  return new FileMCPPersistence(defaultMCPStorageFile());
}

export function getMCPSessionTtlMs(): number {
  const raw = process.env.MCP_SESSION_TTL_MS;
  const parsed = raw ? Number(raw) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 10 * 60 * 1000;
}
