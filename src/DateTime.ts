import { GregorianCalendar } from "./GregorianCalendar";
import { Calendar } from "./Calendar";
import type { Calendarable } from "./Calendarable";
import { EmptyCalendar } from './Calendarable';
import { DateConverter } from "./DateConverter"
import { DateTimeComponents } from "./DateTimeComponents";
import { DateTimeFormatter } from "./DateTimeFormatter";
import { DateTimeParser } from "./DateTimeParser";

let defaultCalendar = new EmptyCalendar;

export class DateTime {
    protected _date: Date;
    protected _calendar: Calendarable;
    private _jd: number;
    protected _components: DateTimeComponents;

    constructor(components?: DateTimeComponents|null, calendar?: Calendarable|string) {
        if (typeof(calendar) === 'string') calendar = Calendar.fromName(calendar);
        this._calendar = calendar ?? this.useDefaultCalendar();
        if (components) {
            this._components = components;
        } else {
            const now = new Date();
            const components = DateTimeComponents.fromJSDate(now);
            if (this.calendarName == 'gregorian') {
                this._date = now;
                this._components = components;
            } else {
                this._components = this._calendar.fromJd((new GregorianCalendar).toJd(components));
            }
        }
        this._jd = this._calendar.toJd(this._components);
    }

    static fromObj(config: {year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number}, calendar?: Calendarable): DateTime {
        return new DateTime(DateTimeComponents.fromObj(config), calendar);
    }

    static fromISO(iso: string, calendar?: Calendarable|string): DateTime {
        return new DateTime((new DateTimeParser).fromISO(iso), calendar);
    }

    toISO(): string {
        return this.stringifyWith('yyyy-MM-ddTHH:mm:ss');
    }

    useDefaultCalendar(): Calendarable {
        return defaultCalendar;
    }

    static setDefaultCalendar(calendar: Calendarable) {
        defaultCalendar = calendar;
    }

    static now(calendar: Calendarable|string) {
        return new DateTime(null, calendar);
    }

    equals(date: DateTime): boolean {
        return this._jd === date.jd;
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