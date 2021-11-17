export class DateTimeComponents {
    private _year: number = null;
    private _month: number = null;
    private _day: number = null;
    private _hour: number = null;
    private _minute: number = null;
    private _second: number = null;

    constructor(components: {year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number}) {
        this._year = components.year ?? null;
        this._month = components.month ?? null;
        this._day = components.day ?? null;
        this._hour = components.hour ?? null;
        this._minute = components.minute ?? null;
        this._second = components.second ?? null;
    }

    static fromObj(components: {year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number}): DateTimeComponents {
        return new DateTimeComponents(components);
    }

    static fromJSDate(date: Date): DateTimeComponents { 
        return new DateTimeComponents({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
        });
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
}