declare module 'locale' {
  export class Locale {
    constructor(str?: string | null);
    code?: string;
    language?: string;
    country?: string;
    normalized?: string;
    score?: number;
    defaulted?: boolean;
    toString(): string | null;
    toJSON(): string | null;
  }

  // Array-like: it borrows push and sort from Array, but is not one.
  export class Locales implements ArrayLike<Locale> {
    constructor(str?: string | string[] | null, def?: string);
    readonly length: number;
    readonly [index: number]: Locale;
    default?: Locale;
    index(): Record<string, number>;
    best(locales?: Locales): Locale;
    toJSON(): Locale[];
    toString(): string;
  }

  const locale: {
    Locale: typeof Locale;
    Locales: typeof Locales;
  };

  export default locale;
}
