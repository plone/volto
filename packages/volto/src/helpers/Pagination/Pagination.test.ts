import {
  computeBStart,
  computeLimit,
  computeTotalPages,
  computeVisibleTotal,
  type IntegerLike,
} from './Pagination';

describe('computeBStart', () => {
  describe('paging without an offset', () => {
    it('starts the first page at the beginning', () => {
      expect(computeBStart(1, 0, 10, 25)).toBe(0);
    });

    it('advances by the batch size on each page', () => {
      expect(computeBStart(2, 0, 10, 25)).toBe(10);
      expect(computeBStart(3, 0, 10, 25)).toBe(20);
    });

    it('falls back to the default page size when b_size is unset', () => {
      expect(computeBStart(2, 0, undefined, 25)).toBe(25);
      expect(computeBStart(3, 0, null, 25)).toBe(50);
    });

    it('treats a zero b_size as unset', () => {
      expect(computeBStart(2, 0, 0, 25)).toBe(25);
    });
  });

  describe('paging with an offset', () => {
    it('skips the leading items on the first page', () => {
      expect(computeBStart(1, 3, 10, 25)).toBe(3);
    });

    it('keeps the offset applied on later pages', () => {
      expect(computeBStart(2, 3, 10, 25)).toBe(13);
      expect(computeBStart(3, 3, 10, 25)).toBe(23);
    });

    it('applies the offset to the default page size too', () => {
      expect(computeBStart(2, 5, undefined, 25)).toBe(30);
    });
  });

  describe('missing page', () => {
    // getQueryStringResults is also called without a page, e.g. by the query
    // widget's own preview. `undefined - 1` would produce NaN, which
    // serialises to a null b_start.
    it('defaults an undefined page to the first page', () => {
      expect(computeBStart(undefined, 0, 1, 25)).toBe(0);
    });

    it('still honours the offset when the page is missing', () => {
      expect(computeBStart(undefined, 4, 10, 25)).toBe(4);
    });
  });

  describe('integer coercion', () => {
    it('accepts numeric strings from the querystring widget', () => {
      expect(computeBStart('2', '3', '10', 25)).toBe(13);
    });

    it('truncates floats towards zero', () => {
      expect(computeBStart(1, 3.7, 10, 25)).toBe(3);
      expect(computeBStart(2.9, 0, 10, 25)).toBe(10);
    });

    it('falls back on values that are not numbers', () => {
      expect(computeBStart('abc', 'xyz', 10, 25)).toBe(0);
      expect(computeBStart(NaN, NaN, 10, 25)).toBe(0);
      expect(computeBStart(Infinity, 0, 10, 25)).toBe(0);
    });

    it('treats empty strings as unset', () => {
      expect(computeBStart('', '', '', 25)).toBe(0);
      expect(computeBStart(2, '', '', 25)).toBe(25);
    });
  });

  describe('result is always a non-negative integer', () => {
    it('clamps a page below one to the first page', () => {
      expect(computeBStart(0, 0, 10, 25)).toBe(0);
      expect(computeBStart(-5, 0, 10, 25)).toBe(0);
    });

    it('ignores a negative offset', () => {
      expect(computeBStart(1, -3, 10, 25)).toBe(0);
      expect(computeBStart(2, -3, 10, 25)).toBe(10);
    });

    it('returns the offset alone when no batch size can be resolved', () => {
      expect(computeBStart(3, 7, undefined, undefined)).toBe(7);
    });

    const cases: Array<[IntegerLike, IntegerLike, IntegerLike, IntegerLike]> = [
      [1, 0, 10, 25],
      [undefined, undefined, undefined, undefined],
      ['2', '3.9', '10.1', '25'],
      [-1, -1, -1, -1],
      [2.5, 1.5, 10.5, 25.5],
    ];

    it.each(cases)(
      'returns an integer for (%o, %o, %o, %o)',
      (page, offset, bSize, defaultPageSize) => {
        const result = computeBStart(page, offset, bSize, defaultPageSize);
        expect(Number.isInteger(result)).toBe(true);
        expect(result).toBeGreaterThanOrEqual(0);
      },
    );
  });
});

describe('computeLimit', () => {
  describe('with a limit set', () => {
    it('adds the offset to the limit', () => {
      expect(computeLimit(3, 10)).toBe(13);
    });

    it('returns the limit unchanged when nothing is skipped', () => {
      expect(computeLimit(0, 10)).toBe(10);
    });

    it('accepts values stored as strings by the widget', () => {
      expect(computeLimit('3', '10')).toBe(13);
    });

    it('truncates floats towards zero', () => {
      expect(computeLimit(3.9, 10.9)).toBe(13);
    });

    it('ignores a negative offset', () => {
      expect(computeLimit(-3, 10)).toBe(10);
    });
  });

  describe('without a usable limit', () => {
    it('returns null when the limit is unset', () => {
      expect(computeLimit(3, undefined)).toBeNull();
      expect(computeLimit(3, null)).toBeNull();
      expect(computeLimit(3, '')).toBeNull();
    });

    it('returns null when the limit is not a number', () => {
      expect(computeLimit(3, 'abc')).toBeNull();
      expect(computeLimit(3, NaN)).toBeNull();
      expect(computeLimit(3, Infinity)).toBeNull();
    });

    // plone.app.querystring's querybuilder defaults limit to 0 and only
    // applies it when truthy, so 0 means "no limit". Summing it with the
    // offset would cap the batch at the items the listing then skips.
    it('treats a zero limit as no limit', () => {
      expect(computeLimit(3, 0)).toBeNull();
      expect(computeLimit(3, '0')).toBeNull();
    });

    it('treats a negative limit as no limit', () => {
      expect(computeLimit(3, -10)).toBeNull();
    });
  });

  it('returns an integer or null', () => {
    const cases: Array<[IntegerLike, IntegerLike]> = [
      [3, 10],
      [undefined, undefined],
      ['3.9', '10.1'],
      [-1, -1],
      [0, 0],
    ];

    for (const [offset, limit] of cases) {
      const result = computeLimit(offset, limit);
      expect(result === null || Number.isInteger(result)).toBe(true);
    }
  });
});

describe('computeVisibleTotal', () => {
  it('subtracts the skipped items from the backend total', () => {
    expect(computeVisibleTotal(23, 3)).toBe(20);
  });

  it('returns the total untouched when nothing is skipped', () => {
    expect(computeVisibleTotal(23, 0)).toBe(23);
  });

  it('never goes negative when the offset exceeds the total', () => {
    expect(computeVisibleTotal(2, 5)).toBe(0);
  });

  it('accepts values stored as strings by the widget', () => {
    expect(computeVisibleTotal('23', '3')).toBe(20);
  });

  it('falls back to zero when the total is not yet loaded', () => {
    expect(computeVisibleTotal(undefined, 3)).toBe(0);
    expect(computeVisibleTotal(null, 3)).toBe(0);
  });

  it('ignores a negative offset', () => {
    expect(computeVisibleTotal(23, -3)).toBe(23);
  });
});

describe('computeTotalPages', () => {
  it('splits the total across whole pages', () => {
    expect(computeTotalPages(20, 10)).toBe(2);
    expect(computeTotalPages(23, 10)).toBe(3);
  });

  it('counts a partial page', () => {
    expect(computeTotalPages(21, 10)).toBe(3);
  });

  it('returns zero when there is nothing to show', () => {
    expect(computeTotalPages(0, 10)).toBe(0);
  });

  it('returns zero when no batch size can be resolved', () => {
    expect(computeTotalPages(20, 0)).toBe(0);
    expect(computeTotalPages(20, undefined)).toBe(0);
  });

  it('accepts values stored as strings by the widget', () => {
    expect(computeTotalPages('20', '10')).toBe(2);
  });

  // The regression this pair exists for: 23 results, skip 3, 10 per page.
  // Dividing the raw total gives 3 pages, but page 3 asks for b_start 23 and
  // comes back empty. Only 20 items are reachable, so there are 2 pages.
  it('does not advertise a page the offset makes unreachable', () => {
    const total = 23;
    const offset = 3;
    const bSize = 10;

    expect(computeTotalPages(total, bSize)).toBe(3);
    expect(computeTotalPages(computeVisibleTotal(total, offset), bSize)).toBe(
      2,
    );
    expect(computeBStart(3, offset, bSize, 25)).toBe(23);
  });

  it('keeps the last page reachable across the offset range', () => {
    const total = 25;
    const bSize = 10;

    for (const offset of [0, 1, 5, 10, 15, 24, 25, 30]) {
      const pages = computeTotalPages(
        computeVisibleTotal(total, offset),
        bSize,
      );
      if (pages > 0) {
        const lastPageStart = computeBStart(pages, offset, bSize, 25);
        expect(lastPageStart).toBeLessThan(total);
      }
    }
  });
});
