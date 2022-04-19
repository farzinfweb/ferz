import { Localeable } from "./Localeable";

export class FaPersianLocale implements Localeable {
  name: string = "fa";
  forCalendar = "persian";

  monthNamesFull(): string[] {
    return "فروردین|اردیبهشت|خرداد|تیر|مرداد|شهریور|مهر|آبان|آذر|دی|بهمن|اسفند".split(
      "|"
    );
  }
  monthNamesShort(): string[] {
    return "فرو|ارد|خرد|تیر|مرد|شهر|مهر|آبا|آذر|دی|بهم|اسف".split("|");
  }
  monthNamesNarrow(): string[] {
    return "ف|ار|خ|ت|مر|ش|مه|آب|آذ|د|ب|اس".split("|");
  }
  weekdaysFull(): string[] {
    return "دوشنبه|سه\u200cشنبه|چهارشنبه|پنج\u200cشنبه|جمعه|شنبه|یک\u200cشنبه".split(
      "|"
    );
  }
  weekdaysShort(): string[] {
    return "دوشنبه|سه\u200cشنبه|چهارشنبه|پنج\u200cشنبه|جمعه|شنبه|یک\u200cشنبه".split(
      "|"
    );
  }
  weekdaysNarrow(): string[] {
    return "د|س|چ|پ|ج|ش|ی".split("|");
  }
}
