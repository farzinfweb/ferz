import { DateTimeComponents } from "./DateTimeComponents";

export class DateTimeParser {
  constructor() {}

  fromISO(iso: string): DateTimeComponents {
    let re =
      /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?(?:(Z)|([+-]\d\d)(?::?(\d\d))?)?)?/;
    const matches = iso.match(re);
    if (matches === null) throw new Error("invlid string");
    matches.shift();
    return DateTimeComponents.fromArray(matches);
  }
}
