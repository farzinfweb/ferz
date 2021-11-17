import Calendar from "./Calendar";
import type { Calendarable } from "./Calendarable";
import { EmptyCalendar } from './Calendarable';
import { DateConverter } from "./DateConverter"
import { DateTimeComponents } from "./DateTimeComponents";
import { DateTimeFormatter } from "./DateTimeFormatter";

let defaultCalendar = new EmptyCalendar;

export class DateTime {
    protected _date: Date;
    protected _calendar: Calendarable;
    private _jd: number;
    protected _components: DateTimeComponents;

    public static Calendar = Calendar;

    constructor(components?: DateTimeComponents|null, calendar?: Calendarable) {
        if (components) {
            this._components = components;
        } else {
            this._date = new Date();
            this._components = DateTimeComponents.fromJSDate(this._date);
        }
        this._calendar = calendar ?? this.useDefaultCalendar();
        this._jd = this._calendar.toJd(this._components);
    }

    static fromObj(config: {year: number, month: number, day: number, hour?: number, minute?: number, second?: number}, calendar?: Calendarable): DateTime {
        return new DateTime(DateTimeComponents.fromObj(config), calendar);
    }

    useDefaultCalendar(): Calendarable {
        return defaultCalendar;
    }

    static setDefaultCalendar(calendar: Calendarable) {
        defaultCalendar = calendar;
    }

    static now() {
        return new DateTime();
    }

    equals(date: DateTime): boolean {
        return this._jd === date.jd;
    }

    duplicate(alts: object) {
        const current = {
            year: this.year,
            month: this.month,
            day: this.day,
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

    addDays(days: number): DateTime {
        return this.duplicate({ day: this.day + days });
    }

    subtractDays(days: number): DateTime {
        return this.duplicate({ day: this.day - days });
    }

    get daysInMonth(): number {
        return this._calendar.daysInMonth(this.year, this.month);
    }

    get weekday(): number {
        return Math.floor((Math.ceil(this._jd) + 2) % 7) + 1;
    }

    startOf(unit: String): DateTime {
        if (unit === 'month') return this.setDay(1);
        return this;
    }

    endOf(unit: String): DateTime {
        if (unit === 'month') return this.setDay(this.daysInMonth);
        return this;
    }

    stringifyWith(format: string) {
        return (new DateTimeFormatter).stringify(this, format);
    }
}