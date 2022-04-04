import { Localeable } from "./locales/Localeable";

let dtconfig = {
  _supportedLocales: {},
} as { _supportedLocales: { [key: string]: () => Localeable } };
export class DateTimeConfiguration {
  static addLocaleSupport(locale: Localeable): void {
    dtconfig._supportedLocales[`${locale.name}-${locale.forCalendar}`] = () =>
      locale;
  }

  static getLocale(localeId: string): Localeable {
    const locale = dtconfig._supportedLocales[localeId];
    if (locale == null) throw new Error("Locale not supported.");
    return locale();
  }
}
