import { getTeaserBlockSizes } from './utils';
import config from '@plone/volto/registry';

config.settings.defaultWidth = 940;

describe('getTeaserBlockSizes', () => {
  it('returns the default teaser sizes string', () => {
    expect(getTeaserBlockSizes()).toBe('auto, (max-width: 940px) 100vw, 940px');
  });

  it('returns the teaser sizes for 2 columns', () => {
    expect(getTeaserBlockSizes({ columns: 2 })).toBe(
      'auto, (max-width: 940px) 100vw, 470px',
    );
  });

  it('returns the teaser sizes for 3 columns', () => {
    expect(getTeaserBlockSizes({ columns: 3 })).toBe(
      'auto, (max-width: 940px) 100vw, 313px',
    );
  });

  it('returns the teaser sizes for 4 columns', () => {
    expect(getTeaserBlockSizes({ columns: 4 })).toBe(
      'auto, (max-width: 940px) 100vw, 235px',
    );
  });
});
