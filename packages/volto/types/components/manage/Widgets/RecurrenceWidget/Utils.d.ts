export namespace Days {
    let MO: import("rrule").Weekday;
    let TU: import("rrule").Weekday;
    let WE: import("rrule").Weekday;
    let TH: import("rrule").Weekday;
    let FR: import("rrule").Weekday;
    let SA: import("rrule").Weekday;
    let SU: import("rrule").Weekday;
}
export const WEEKLY_DAYS: import("rrule").Weekday[];
export const MONDAYFRIDAY_DAYS: import("rrule").Weekday[];
export namespace FREQUENCES {
    let DAILY: string;
    let MONDAYFRIDAY: string;
    let WEEKDAYS: string;
    let WEEKLY: string;
    let MONTHLY: string;
    let YEARLY: string;
}
export namespace OPTIONS {
    let frequences: {
        [FREQUENCES.DAILY]: {
            rrule: import("rrule").Frequency;
            interval: boolean;
        };
        [FREQUENCES.MONDAYFRIDAY]: {
            rrule: import("rrule").Frequency;
        };
        [FREQUENCES.WEEKDAYS]: {
            rrule: import("rrule").Frequency;
        };
        [FREQUENCES.WEEKLY]: {
            rrule: import("rrule").Frequency;
            interval: boolean;
            byday: boolean;
        };
        [FREQUENCES.MONTHLY]: {
            rrule: import("rrule").Frequency;
            interval: boolean;
            bymonth: boolean;
        };
        [FREQUENCES.YEARLY]: {
            rrule: import("rrule").Frequency;
            interval: boolean;
            byyear: boolean;
        };
    };
}
export function toISOString(date: any): any;
export function rrulei18n(intl: any, moment: any, lang: any): {
    dayNames: any;
    monthNames: any;
    strings: {};
    dateFormatter: (year: any, month: any, day: any) => any;
};
