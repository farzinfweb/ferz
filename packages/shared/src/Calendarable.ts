import { DateTimeComponents } from "./DateTimeComponents";

export interface Calendarable {
  name: string;

  toJd(date: DateTimeComponents): number;

  fromJd(jd: number): DateTimeComponents;

  isLeap(year: number): boolean;

  daysInMonth(year: number, month: number): number;
}
