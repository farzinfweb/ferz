import type { Calendarable } from "./Calendarable";
import type { DateTime } from "./DateTime";
import { DateTimeComponents } from "./DateTimeComponents";

export class DateConverter {
    protected _date: DateTime;

    constructor(from: DateTime) {
        this._date = from;
    }

    public convert(calendar: Calendarable): DateTimeComponents {
        return calendar.fromJd(this._date.jd);
    }
}