import Calendar from "./Calendar";
import type { Calendarable } from "./Calendarable";
import { EmptyCalendar } from './Calendarable';
import { DateConverter } from "./DateConverter"
import { DateTimeFormatter } from "./DateTimeFormatter";

let defaultCalendar = new EmptyCalendar;

export class DateTime {
    protected _date: Date;
    protected _calendar: Calendarable;
    private _year: number;
    private _month: number;
    private _jd: number;
    
    protected _day: number;
    protected _hour: number;
    protected _minute: number;
    protected _second: number;

    public static Calendar = Calendar;

    constructor(config: {year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number}, calendar?: Calendarable) {
        this._date = new Date();
        this._year = config.year ?? this._date.getFullYear();
        this._month = config.month ?? this._date.getMonth() + 1;
        this._day = config.day ?? this._date.getDate();
        this._hour = config.hour ?? this._date.getHours();
        this._minute = config.minute ?? this._date.getMinutes();
        this._second = config.second ?? this._date.getSeconds();
        this._calendar = calendar ?? this.useDefaultCalendar();
        this._jd = this._calendar.toJd(this);
    }

    useDefaultCalendar(): Calendarable {
        return defaultCalendar;
    }

    static setDefaultCalendar(calendar: Calendarable) {
        defaultCalendar = calendar;
    }

    static now() {
        return new DateTime({});
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
        return new DateTime({ ...current, ...alts }, this.calendar);
    }

    public toCalendar(calendar: Calendarable): DateTime {
        const converter = new DateConverter(this);
        return converter.convert(calendar);
    }

    get calendar(): Calendarable {
        return this._calendar;
    }

    get calendarName(): string {
        return this._calendar.name;
    }

    get year(): number {
        return this._year;
    }
    get month(): number {
        return this._month;
    }
    get day(): number {
        return this._day;
    }
    get hour(): number {
        return this._hour;
    }
    get minute(): number {
        return this._minute;
    }
    get second(): number {
        return this._second;
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
        return this._calendar.daysInMonth(this._year, this._month);
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