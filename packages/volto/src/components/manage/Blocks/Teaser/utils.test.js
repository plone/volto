import { getTeaserBlockSizes } from './utils';
import config from '@plone/volto/registry';

config.settings.layout = { tabletBreakpoint: 768, defaultContainerWidth: 940 };

describe('getTeaserBlockSizes', () => {
  it('returns the teaser sizes string for a standalone teaser block', () => {
    expect(getTeaserBlockSizes()).toBe('auto, (max-width: 768px) 100vw, 470px');
  });

  it('returns the teaser sizes for a 1-column grid', () => {
    expect(getTeaserBlockSizes({ inGrid: true, columns: 1 })).toBe(
      'auto, (max-width: 768px) 100vw, 940px',
    );
  });

  it('returns the teaser sizes for 2 columns', () => {
    expect(getTeaserBlockSizes({ inGrid: true, columns: 2 })).toBe(
      'auto, (max-width: 768px) 100vw, 470px',
    );
  });

  it('returns the teaser sizes for 3 columns', () => {
    expect(getTeaserBlockSizes({ inGrid: true, columns: 3 })).toBe(
      'auto, (max-width: 768px) 100vw, 313px',
    );
  });

  it('returns the teaser sizes for 4 columns', () => {
    expect(getTeaserBlockSizes({ inGrid: true, columns: 4 })).toBe(
      'auto, (max-width: 768px) 100vw, 235px',
    );
  });
});
