import type { DateTime } from "./DateTime";
import { DateTimeConfiguration } from "./DateTimeConfiguration";

export class DateTimeFormatter {
  _currentLocale: string = "";

  parse(format: string) {
    let chunks = [];
    let batch = "";
    let char: string = "";
    format.split("").forEach((v) => {
      if (v === char) {
        batch += v;
      } else {
        if (batch.length > 0) chunks.push(batch);
        batch = v;
        char = v;
      }
    });
    if (batch.length > 0) chunks.push(batch);
    return chunks;
  }

  valueOfToken(token: string, dt: DateTime) {
    switch (token) {
      case "y":
        return dt.year.toString();
      case "yy":
        return dt.year.toString().slice(-2);
      case "yyyy":
        return dt.year.toString().padStart(4, "0");
      case "M":
        return dt.month.toString();
      case "MM":
        return dt.month.toString().padStart(2, "0");
      case "MMM":
        return this.monthNameToLocale(dt.month, "short");
      case "MMMM":
        return this.monthNameToLocale(dt.month, "full");
      case "MMMMM":
        return this.monthNameToLocale(dt.month, "narrow");
      case "d":
        return dt.day.toString();
      case "dd":
        return dt.day.toString().padStart(2, "0");
      case "E":
        return dt.weekday.toString();
      case "EE":
        return dt.weekday.toString().padStart(2, "0");
      case "EEE":
        return this.weekdayToLocale(dt.weekday, "short");
      case "EEEE":
        return this.weekdayToLocale(dt.weekday, "full");
      case "EEEEE":
        return this.weekdayToLocale(dt.weekday, "narrow");
      case "h":
        return dt.hour === 12 ? (12).toString() : (dt.hour % 12).toString();
      case "hh":
        return dt.hour === 12
          ? (12).toString()
          : (dt.hour % 12).toString().padStart(2, "0");
      case "H":
        return dt.hour.toString();
      case "HH":
        return dt.hour.toString().padStart(2, "0");
      case "m":
        return dt.minute.toString();
      case "mm":
        return dt.minute.toString().padStart(2, "0");
      case "s":
        return dt.second.toString();
      case "ss":
        return dt.second.toString().padStart(2, "0");
      default:
        return token;
    }
  }

  public stringify(dt: DateTime, format: string, locale?: string): string {
    this._currentLocale = locale + "-" + dt.calendarName;
    return this.parse(format)
      .map((v) => {
        return this.valueOfToken(v, dt);
      })
      .join("");
  }

  monthNameToLocale(month: number, length: string = "full"): string {
    const locale = DateTimeConfiguration.getLocale(this._currentLocale);
    switch (length) {
      case "full":
        return locale.monthNamesFull()[month - 1];
      case "short":
        return locale.monthNamesShort()[month - 1];
      case "narrow":
        return locale.monthNamesNarrow()[month - 1];
      default:
        return "";
    }
  }

  weekdayToLocale(weekday: number, length: string = "full") {
    const locale = DateTimeConfiguration.getLocale(this._currentLocale);
    switch (length) {
      case "full":
        return locale.weekdaysFull()[weekday - 1];
      case "short":
        return locale.weekdaysShort()[weekday - 1];
      case "narrow":
        return locale.weekdaysNarrow()[weekday - 1];
    }
  }
}
