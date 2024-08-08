/**
 * Friendly formatting for dates
 */
export function formatDate({ date, format, locale, long, includeTime, formatToParts, }: {
    date: any;
    format: any;
    locale?: string;
    long: any;
    includeTime: any;
    formatToParts?: boolean;
}): string | Intl.DateTimeFormatPart[];
export function formatRelativeDate({ date, locale, relativeTo, style, formatToParts, }: {
    date: any;
    locale?: string;
    relativeTo: any;
    style?: string;
    formatToParts?: boolean;
}): string | Intl.RelativeTimeFormatPart[];
export namespace short_date_format {
    let year: string;
    let month: string;
    let day: string;
}
export namespace short_date_and_time_format {
    let dateStyle: string;
    let timeStyle: string;
}
export namespace long_date_format {
    let dateStyle_1: string;
    export { dateStyle_1 as dateStyle };
    let timeStyle_1: string;
    export { timeStyle_1 as timeStyle };
}
export function toDate(d: any): any;
