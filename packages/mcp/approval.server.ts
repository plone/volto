import { createHash } from 'node:crypto';
import type { MCPPersistence } from './persistence.server.ts';
import type { MCPApproval } from './types.ts';

const APPROVAL_TTL_MS = 10 * 60 * 1000;

export function hashApprovalPayload(payload: Record<string, unknown>): string {
  return createHash('sha256').update(JSON.stringify(payload)).digest('hex');
}

export function getApprovalExpiry(now = Date.now()): string {
  return new Date(now + APPROVAL_TTL_MS).toISOString();
}

export async function ensurePendingApproval(args: {
  persistence: MCPPersistence;
  approvalId: string;
}): Promise<MCPApproval> {
  const approval = await args.persistence.getApproval(args.approvalId);

  if (!approval) {
    throw new Error('Approval request not found');
  }
  if (approval.decision !== 'pending') {
    throw new Error(`Approval request is not pending: ${approval.decision}`);
  }
  if (approval.expiresAt <= new Date().toISOString()) {
    await args.persistence.decideApproval({
      id: approval.id,
      decision: 'expired',
    });
    throw new Error('Approval request has expired');
  }

  return approval;
}
