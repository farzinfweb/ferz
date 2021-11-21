import { Localeable } from "./Localeable";

export class FaGregorianLocale implements Localeable {
    name: string = 'fa';
    forCalendar = 'gregorian';

    monthNamesFull(): string[] {
        return 'ژانویه|فوریه|مارس|آوریل|مه|ژوئن|ژوئیه|اوت|سپتامبر|اکتبر|نوامبر|دسامبر'.split('|');
    }
    monthNamesShort(): string[] {
        return 'ژان|فور|مار|آور|مه|ژوئن|ژوئیه|اوت|سپت|اکت|نوا|دسا'.split('|');
    }
    monthNamesNarrow(): string[] {
        return 'ژ|ف|م|آ|مه|ژو|ژو|او|س|اک|ن|د'.split('|');
    }
    weekdaysFull(): string[] {
        return 'یک\u200cشنبه|دوشنبه|سه\u200cشنبه|چهارشنبه|پنج\u200cشنبه|جمعه|شنبه'.split('|');
    }
    weekdaysShort(): string[] {
        return 'یک|دو|سه|چهار|پنج|جمعه|شنبه'.split('|');
    }
    weekdaysNarrow(): string[] {
        return 'ی|د|س|چ|پ|ج|ش'.split('|');
    }
}