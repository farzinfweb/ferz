import type { Calendarable } from "../../shared/src/Calendarable";
import type { DateTimeComponents } from "../../shared/src/DateTimeComponents";
export class Calendar {
  static PERSIAN = "persian";
  static GREGORIAN = "gregorian";
  static ISLAMIC = "islamic";
}

export class EmptyCalendar implements Calendarable {
  name: string = "empty";
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
