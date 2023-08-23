import { type Localeable } from "../../../shared/src/Localeable";

export default {
  name: "fa",
  forCalendar: "persian",
  monthNamesFull: () => {
    return "فروردین|اردیبهشت|خرداد|تیر|مرداد|شهریور|مهر|آبان|آذر|دی|بهمن|اسفند".split(
      "|"
    );
  },
  monthNamesShort: () => {
    return "فرو|ارد|خرد|تیر|مرد|شهر|مهر|آبا|آذر|دی|بهم|اسف".split("|");
  },
  monthNamesNarrow: () => {
    return "ف|ار|خ|ت|مر|ش|مه|آب|آذ|د|ب|اس".split("|");
  },
  weekdaysFull: () => {
    return "دوشنبه|سه\u200cشنبه|چهارشنبه|پنج\u200cشنبه|جمعه|شنبه|یک\u200cشنبه".split(
      "|"
    );
  },
  weekdaysShort: () => {
    return "دوشنبه|سه\u200cشنبه|چهارشنبه|پنج\u200cشنبه|جمعه|شنبه|یک\u200cشنبه".split(
      "|"
    );
  },
  weekdaysNarrow: () => {
    return "د|س|چ|پ|ج|ش|ی".split("|");
  },
} satisfies Localeable;
