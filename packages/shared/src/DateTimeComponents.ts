export class DateTimeComponents {
  private _year: number;
  private _month: number;
  private _day: number;
  private _hour: number;
  private _minute: number;
  private _second: number;

  constructor(components: {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
  }) {
    this._year = components.year ?? 0;
    this._month = components.month ?? 0;
    this._day = components.day ?? 0;
    this._hour = components.hour ?? 0;
    this._minute = components.minute ?? 0;
    this._second = components.second ?? 0;
  }

  static fromObj(components: {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
  }): DateTimeComponents {
    return new DateTimeComponents(components);
  }

  static fromArray(data: (number | string)[]) {
    const structure = ["year", "month", "day", "hour", "minute", "second"];
    let obj: { [key: string]: any } = {};
    data.forEach((v, i) => {
      const parsed =
        typeof v === "string" && !isNaN(parseInt(v)) ? parseInt(v) : v;
      obj[structure[i]] = parsed == null ? 0 : parsed;
    });
    return new DateTimeComponents(obj);
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
