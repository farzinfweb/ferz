import { DateTimeComponents } from "./DateTimeComponents";

export interface Calendarable {
    name: string;

    toJd(date: DateTimeComponents): number;

    fromJd(jd: number): DateTimeComponents;

    isLeap(year: number): boolean;

    daysInMonth(year: number, month: number): number;
}

export class EmptyCalendar implements Calendarable {
    name: string = 'empty';
    toJd(date: DateTimeComponents): number {
        throw new Error("Method not implemented.");
    }
    fromJd(jd: number): DateTimeComponents {
        throw new Error("Method not implemented.");
    }
    isLeap(year: number): boolean {
        throw new Error("Method not implemented.");
    }
    daysInMonth(year: number, month: number): number {
        throw new Error("Method not implemented.");
    }
}