import type { Calendarable } from "./Calendarable";
import { DateTime } from "./DateTime";

export class PersianCalendar implements Calendarable {
    public name: string = 'persian';
    static PERSIAN_EPOCH = 1948320.5;

    toJd(date: DateTime): number {
        var epbase, epyear;

        epbase = date.year - ((date.year >= 0) ? 474 : 473);
        epyear = 474 + (epbase % 2820);
    
        return date.day +
                ((date.month <= 7) ?
                    ((date.month - 1) * 31) :
                    (((date.month - 1) * 30) + 6)
                ) +
                Math.floor(((epyear * 682) - 110) / 2816) +
                (epyear - 1) * 365 +
                Math.floor(epbase / 2820) * 1029983 +
                (PersianCalendar.PERSIAN_EPOCH - 1);
    }

    fromJd(jd: number): DateTime {
        var year, month, day, depoch, cycle, cyear, ycycle,
        aux1, aux2, yday;
        jd = Math.floor(jd) + 0.5;
        depoch = jd - this.toJd(new DateTime({ year: 475, month: 1, day: 1 }));
        cycle = Math.floor(depoch / 1029983);
        cyear = depoch % 1029983;
        if (cyear == 1029982) {
            ycycle = 2820;
        } else {
            aux1 = Math.floor(cyear / 366);
            aux2 = cyear % 366;
            ycycle = Math.floor(((2134 * aux1) + (2816 * aux2) + 2815) / 1028522) +
                        aux1 + 1;
        }
        year = ycycle + (2820 * cycle) + 474;
        if (year <= 0) {
            year--;
        }
        yday = (jd - this.toJd(new DateTime({ year, month: 1, day: 1 }))) + 1;
        month = (yday <= 186) ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30);
        day = (jd - this.toJd(new DateTime({ year, month, day: 1 }))) + 1;
        return new DateTime({year, month, day}, new PersianCalendar);
    }

    isLeap(year: number): boolean {
        return ((((((year - ((year > 0) ? 474 : 473)) % 2820) + 474) + 38) * 682) % 2816) < 682;
    }

    daysInMonth(year: number, month: number): number {
        if (month == 12 && !this.isLeap(year)) return 29;
        return month <= 6 ? 31 : 30;
    }
}