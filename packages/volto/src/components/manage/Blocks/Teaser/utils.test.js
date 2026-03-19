import { getTeaserBlockSizes } from './utils';

describe('getTeaserBlockSizes', () => {
  it('returns the default teaser sizes string', () => {
    expect(getTeaserBlockSizes()).toBe('auto, (max-width: 940px) 100vw, 940px');
  });
});
