import { describe, expect, it } from 'vitest';
import { loader } from './okroute';

describe('okroute', () => {
  it('should return a 200 response', async () => {
    const response = await loader();
    expect(response.status).toBe(200);
  });
});
