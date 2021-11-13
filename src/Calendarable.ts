import type { DateTime } from "./DateTime";

export interface Calendarable {
    name: string;

    toJd(date: DateTime): number;

    fromJd(jd: number): DateTime;

    isLeap(year: number): boolean;

    daysInMonth(year: number, month: number): number;
}

export class EmptyCalendar implements Calendarable {
    name: string = 'empty';
    toJd(date: DateTime): number {
        throw new Error("Method not implemented.");
    }
    fromJd(jd: number): DateTime {
        throw new Error("Method not implemented.");
    }
    isLeap(year: number): boolean {
        throw new Error("Method not implemented.");
    }
    daysInMonth(year: number, month: number): number {
        throw new Error("Method not implemented.");
    }
}