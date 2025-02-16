// `react-intl` shape-like types

export declare interface MessageDescriptor {
  id?: string | number;
  description?: string | object;
  defaultMessage?: string;
}

export declare type PrimitiveType =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date;

export declare type FormatXMLElementFn = (...args: any[]) => string | object;

export declare interface IntlConfig {
  locale: string;
  timeZone?: string;
  formats: unknown;
  textComponent?: React.ComponentType | keyof React.ReactHTML;
  messages: Record<string, string>;
  defaultLocale: string;
  defaultFormats: unknown;
  onError(err: string): void;
}

export declare interface IntlFormatters {
  formatMessage(
    descriptor: MessageDescriptor,
    values?: Record<string, PrimitiveType>,
  ): string;
  formatMessage(
    descriptor: MessageDescriptor,
    values?: Record<
      string,
      PrimitiveType | React.ReactElement | FormatXMLElementFn
    >,
  ): string | React.ReactNodeArray;
}

export declare interface IntlShape extends IntlConfig, IntlFormatters {}
