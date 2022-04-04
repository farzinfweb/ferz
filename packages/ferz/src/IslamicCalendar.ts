import type { Calendarable } from "./Calendarable";
import { DateTimeComponents } from "./DateTimeComponents";

export class IslamicCalendar implements Calendarable {
  public name: string = "islamic";
  static ISLAMIC_EPOCH = 1948439.5;

  toJd(date: DateTimeComponents): number {
    return (
      date.day +
      Math.ceil(29.5 * (date.month - 1)) +
      (date.year - 1) * 354 +
      Math.floor((3 + 11 * date.year) / 30) +
      IslamicCalendar.ISLAMIC_EPOCH -
      1
    );
  }
  fromJd(jd: number): DateTimeComponents {
    var year, month, day;
    jd = Math.floor(jd) + 0.5;
    year = Math.floor(
      (30 * (jd - IslamicCalendar.ISLAMIC_EPOCH) + 10646) / 10631
    );
    if (year == 1436 || year == 1437 || year == 1438) {
      let y1436 = [29, 30, 29, 29, 30, 29, 30, 29, 30, 29, 30, 30];
      let y1437 = [29, 30, 30, 29, 30, 29, 29, 30, 29, 29, 30, 30];
      let y1438 = [29, 30, 30, 30, 29, 29, 29, 30, 29, 29, 30, 29];
      var y = [];
      switch (year) {
        case 1436: {
          y = y1436;
          break;
        }
        case 1437: {
          y = y1437;
          break;
        }
        case 1438: {
          y = y1438;
          break;
        }
      }
      let x =
        jd -
        this.toJd(DateTimeComponents.fromObj({ year, month: 1, day: 1 })) +
        1;
      var sum = 0;
      var i = 0;
      while (i < 12) {
        if (sum + y[i] < x) {
          sum += y[i];
          i++;
        } else {
          break;
        }
      }
      day = x - sum;
      month = i + 1;
    } else {
      month = Math.min(
        12,
        Math.ceil(
          (jd -
            (29 +
              this.toJd(
                DateTimeComponents.fromObj({ year, month: 1, day: 1 })
              ))) /
            29.5
        ) + 1
      );
      day =
        jd - this.toJd(DateTimeComponents.fromObj({ year, month, day: 1 })) + 1;
    }
    return DateTimeComponents.fromObj({ year, month, day });
  }
  isLeap(year: number): boolean {
    return (year * 11 + 14) % 30 < 11;
  }

  daysInMonth(year: number, month: number): number {
    if (year === 1436)
      [29, 30, 29, 29, 30, 29, 30, 29, 30, 29, 30, 30][month - 1];
    if (year === 1437)
      [29, 30, 30, 29, 30, 29, 29, 30, 29, 29, 30, 30][month - 1];
    if (year === 1438)
      [29, 30, 30, 30, 29, 29, 29, 30, 29, 29, 30, 29][month - 1];
    if (month === 12 && this.isLeap(year)) return 30;
    return month % 2 === 0 ? 29 : 30;
  }
}
