import type { Calendarable } from "./Calendarable";
import { DateTimeComponents } from "./DateTimeComponents";

export class GregorianCalendar implements Calendarable {
    public name: string = 'gregorian';
    static GREGORIAN_EPOCH = 1721425.5;

    toJd(date: DateTimeComponents): number {
        const GREGORIAN_EPOCH = 1721425.5;
        return (GREGORIAN_EPOCH - 1) +
           (365 * (date.year - 1)) +
           Math.floor((date.year - 1) / 4) +
           (-Math.floor((date.year - 1) / 100)) +
           Math.floor((date.year - 1) / 400) +
           Math.floor((((367 * date.month) - 362) / 12) +
           ((date.month <= 2) ? 0 :
                               (this.isLeap(date.year) ? -1 : -2)
           ) +
           date.day);
    }

    fromJd(jd: number): DateTimeComponents {
        var wjd, depoch, quadricent, dqc, cent, dcent, quad, dquad,
        yindex, dyindex, year, yearday, leapadj, month, day;

        wjd = Math.floor(jd - 0.5) + 0.5;
        depoch = wjd - GregorianCalendar.GREGORIAN_EPOCH;
        quadricent = Math.floor(depoch / 146097);
        dqc = depoch % 146097;
        cent = Math.floor(dqc / 36524);
        dcent = dqc % 36524;
        quad = Math.floor(dcent / 1461);
        dquad = dcent % 1461;
        yindex = Math.floor(dquad / 365);
        year = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex;
        if (!((cent == 4) || (yindex == 4))) {
            year++;
        }
        yearday = wjd - this.toJd(DateTimeComponents.fromObj({year, month: 1, day: 1}));
        leapadj = ((wjd < this.toJd(DateTimeComponents.fromObj({year, month: 3, day: 1}))) ? 0
                                                    :
                    (this.isLeap(year) ? 1 : 2)
                );
        month = Math.floor((((yearday + leapadj) * 12) + 373) / 367);
        day = (wjd - this.toJd(DateTimeComponents.fromObj({year, month, day: 1}))) + 1;
        return DateTimeComponents.fromObj({year, month, day});
    }

    isLeap(year: number): boolean {
        return ((year % 4) == 0) &&
            (!(((year % 100) == 0) && ((year % 400) != 0)));
    }

    daysInMonth(year: number, month: number): number {
        if (month == 2 && this.isLeap(year)) return 29;
        return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
    }
}