import { GregorianCalendar } from "./GregorianCalendar";
import { PersianCalendar } from "./PersianCalendar";
import { IslamicCalendar } from "./IslamicCalendar";

export class Calendar {
  static PERSIAN = "persian";
  static GREGORIAN = "gregorian";
  static ISLAMIC = "islamic";

  static fromName(name: string) {
    switch (name) {
      case "persian":
        return new PersianCalendar();
      case "gregorian":
        return new GregorianCalendar();
      case "islamic":
        return new IslamicCalendar();
      default:
        throw new Error(
          "Calendar not found. Please use a predefined calendar or register your own"
        );
    }
  }
}
