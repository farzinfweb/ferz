import { type Localeable } from "../../../shared/src/Localeable";

export default {
  name: "fa",
  forCalendar: "gregorian",

  monthNamesFull: () => {
    return "ژانویه|فوریه|مارس|آوریل|مه|ژوئن|ژوئیه|اوت|سپتامبر|اکتبر|نوامبر|دسامبر".split(
      "|"
    );
  },
  monthNamesShort: () => {
    return "ژان|فور|مار|آور|مه|ژوئن|ژوئیه|اوت|سپت|اکت|نوا|دسا".split("|");
  },
  monthNamesNarrow: () => {
    return "ژ|ف|م|آ|مه|ژو|ژو|او|س|اک|ن|د".split("|");
  },
  weekdaysFull: () => {
    return "دوشنبه|سه\u200cشنبه|چهارشنبه|پنج\u200cشنبه|جمعه|شنبه|یک\u200cشنبه".split(
      "|"
    );
  },
  weekdaysShort: () => {
    return "دو|سه|چهار|پنج|جمعه|شنبه|یک".split("|");
  },
  weekdaysNarrow: () => {
    return "د|س|چ|پ|ج|ش|ی".split("|");
  },
} satisfies Localeable;
