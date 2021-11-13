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
            case 'yy':
                return dt.year.toString().slice(-2);
            case 'MM':
                return dt.month.toString().padStart(2, "0");
            case 'dd':
                return dt.day.toString().padStart(2, "0");
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