import { describe, expect, it } from 'vitest';

import { ParagraphElement } from './paragraph-node';

describe('block inner container', () => {
  it('wraps paragraph children in a block-inner-container', () => {
    const element = ParagraphElement({
      attributes: { 'data-slate-node': 'element' },
      children: 'Paragraph body',
    } as any);

    expect(element.props.children.type.name).toBe('BlockInnerContainer');
    expect(element.props.children.props.children).toBe('Paragraph body');
  });
});
