import type { Calendarable } from "./Calendarable";
import type { DateTime } from "./DateTime";

export class DateConverter {
    protected _date: DateTime;

    constructor(from: DateTime) {
        this._date = from;
    }

    public convert(calendar: Calendarable): DateTime {
        return calendar.fromJd(this._date.jd);
    }
}