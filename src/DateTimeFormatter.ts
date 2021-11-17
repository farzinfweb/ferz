import type { DateTime } from "./DateTime";

export class DateTimeFormatter {
    parse(format: string) {
        let chunks = [];
        let batch = "";
        let char: string = "";
        format.split('').forEach(v => {
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
            case 'y':
                return dt.year.toString();
            case 'yy':
                return dt.year.toString().slice(-2);
            case 'yyyy':
                return dt.year.toString().padStart(4, "0");
            case 'M':
                return dt.month.toString();
            case 'MM':
                return dt.month.toString().padStart(2, "0");
            case 'd':
                return dt.day.toString();
            case 'dd':
                return dt.day.toString().padStart(2, "0");
            case 'h':
                return dt.hour === 12 ? (12).toString() : (dt.hour % 12).toString();
            case 'hh':
                return dt.hour === 12 ? (12).toString() : (dt.hour % 12).toString().padStart(2, "0");
            case 'H':
                return dt.hour.toString();
            case 'HH':
                return dt.hour.toString().padStart(2, "0");
            case 'm':
                return dt.minute.toString();
            case 'mm':
                return dt.minute.toString().padStart(2, "0");
            case 's':
                return dt.second.toString();
            case 'ss':
                return dt.second.toString().padStart(2, "0");
            default:
                return token;
        }
    }

    stringify(dt: DateTime, format: string): string {
        return this.parse(format).map(v => {
            return this.valueOfToken(v, dt);
        }).join('');
    }
}