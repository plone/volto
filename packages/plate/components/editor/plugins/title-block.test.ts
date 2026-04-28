import { describe, expect, it } from 'vitest';

import { TITLE_BLOCK_TYPE, BaseTitleBlockPlugin } from './title';

describe('title block plugin', () => {
  it('exposes the expected title block type key', () => {
    expect(TITLE_BLOCK_TYPE).toBe('title');
    expect(BaseTitleBlockPlugin.key).toBe(TITLE_BLOCK_TYPE);
  });
});
