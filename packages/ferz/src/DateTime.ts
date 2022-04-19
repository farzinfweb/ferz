import { GregorianCalendar } from "./GregorianCalendar";
import { Calendar } from "./Calendar";
import type { Calendarable } from "./Calendarable";
import { EmptyCalendar } from "./Calendarable";
import { DateConverter } from "./DateConverter";
import { DateTimeComponents } from "./DateTimeComponents";
import { DateTimeFormatter } from "./DateTimeFormatter";
import { DateTimeParser } from "./DateTimeParser";

let defaultCalendar = new EmptyCalendar();

function tsFromComponents(c: DateTimeComponents): number {
  return new Date(
    c.year,
    c.month - 1,
    c.day,
    c.hour,
    c.minute,
    c.second
  ).valueOf();
}

export class DateTime {
  protected _ts: number;
  protected _calendar: Calendarable;
  private _jd: number;
  protected _components: DateTimeComponents;

  constructor(
    components: DateTimeComponents,
    calendar?: Calendarable | string,
    jsDate?: Date
  ) {
    if (typeof calendar === "string") calendar = Calendar.fromName(calendar);
    this._calendar = calendar ?? this.useDefaultCalendar();
    this._components = components;
    this._jd = this._calendar.toJd(this._components);
    this._ts = jsDate
      ? jsDate.valueOf()
      : tsFromComponents(
          this.calendarName === "gregorian"
            ? this._components
            : new GregorianCalendar().fromJd(this._jd)
        );
  }

  static fromObj(
    config: {
      year?: number;
      month?: number;
      day?: number;
      hour?: number;
      minute?: number;
      second?: number;
    },
    calendar?: Calendarable
  ): DateTime {
    return new DateTime(DateTimeComponents.fromObj(config), calendar);
  }

  static fromISO(iso: string, calendar?: Calendarable | string): DateTime {
    return new DateTime(new DateTimeParser().fromISO(iso), calendar);
  }

  toISO(): string {
    return this.stringifyWith("yyyy-MM-ddTHH:mm:ss");
  }

  useDefaultCalendar(): Calendarable {
    return defaultCalendar;
  }

  static setDefaultCalendar(calendar: Calendarable) {
    defaultCalendar = calendar;
  }

  static now(calendar?: Calendarable | string) {
    if (typeof calendar === "string") calendar = Calendar.fromName(calendar);
    calendar = calendar ?? defaultCalendar;
    const now = new Date();
    const gregorianComponents = DateTimeComponents.fromJSDate(now);
    if (calendar.name === "gregorian") {
      return new DateTime(gregorianComponents, calendar, now);
    }
    return new DateTime(
      calendar.fromJd(new GregorianCalendar().toJd(gregorianComponents)),
      calendar,
      now
    );
  }

  equals(date: DateTime): boolean {
    return this._jd === date.jd;
  }

  valueOf() {
    return this._ts;
  }

  duplicate(alts: object) {
    if (alts instanceof DateTimeComponents) {
      return new DateTime(alts, this.calendar);
    }
    const current = {
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      second: this.second,
    };
    return DateTime.fromObj({ ...current, ...alts }, this.calendar);
  }

  public toCalendar(calendar: Calendarable): DateTime {
    const converter = new DateConverter(this);
    return new DateTime(converter.convert(calendar), calendar);
  }

  get calendar(): Calendarable {
    return this._calendar;
  }

  get calendarName(): string {
    return this._calendar.name;
  }

  get year(): number {
    return this._components.year;
  }
  get month(): number {
    return this._components.month;
  }
  get day(): number {
    return this._components.day;
  }
  get hour(): number {
    return this._components.hour;
  }
  get minute(): number {
    return this._components.minute;
  }
  get second(): number {
    return this._components.second;
  }
  setDay(value: number) {
    return this.duplicate({ day: value });
  }
  setMonth(value: number) {
    return this.duplicate({ month: value });
  }
  get jd(): number {
    return this._jd;
  }

  subtractYears(year: number): DateTime {
    return this.duplicate({ year: this.year - year });
  }

  addYears(year: number): DateTime {
    return this.duplicate({ year: this.year + year });
  }

  addMonths(months: number): DateTime {
    const newMonth = (this.month + months) % 12;
    const shouldAddYear = 12 - this.month < months;
    return this.duplicate({
      month: newMonth === 0 ? 12 : newMonth,
      year: shouldAddYear ? this.year + 1 : this.year,
    });
  }

  subtractMonths(months: number): DateTime {
    const newMonth = this.month - months;
    const shouldSubYear = this.month <= months;
    return this.duplicate({
      month: newMonth <= 0 ? 12 + newMonth : newMonth,
      year: shouldSubYear ? this.year - 1 : this.year,
    });
  }

  addDays(days: number): DateTime {
    return this.duplicate(this.calendar.fromJd(this._jd + days));
  }

  subtractDays(days: number): DateTime {
    return this.duplicate(this.calendar.fromJd(this._jd - days));
  }

  get daysInMonth(): number {
    return this._calendar.daysInMonth(this.year, this.month);
  }

  get weekday(): number {
    return Math.floor(Math.ceil(this._jd) % 7) + 1;
  }

  startOf(unit: String): DateTime {
    if (unit === "month") return this.setDay(1);
    return this;
  }

  endOf(unit: String): DateTime {
    if (unit === "month") return this.setDay(this.daysInMonth);
    return this;
  }

  stringifyWith(
    format: string,
    locale?: string,
    formatter?: DateTimeFormatter
  ) {
    return (formatter ?? new DateTimeFormatter()).stringify(
      this,
      format,
      locale
    );
  }
}
