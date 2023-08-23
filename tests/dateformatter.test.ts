import { describe, it, expect, beforeAll } from "vitest";
import { DateTime } from "ferz";
import { DateTimeConfiguration } from "ferz";
import { DateTimeFormatter } from "ferz";
import GregorianCalendar from "@ferz/gregorian-calendar";
import { FaGregorianLocale } from "@ferz/locales";
import { FaPersianLocale } from "@ferz/locales";

describe("DateTimeFormatter", () => {
  beforeAll(() => {
    DateTime.setDefaultCalendar(new GregorianCalendar());
  });

  it("should parse the string format correctly", () => {
    const formatter = new DateTimeFormatter();
    expect(formatter.parse("yyyy-mm-dd")).toEqual([
      "yyyy",
      "-",
      "mm",
      "-",
      "dd",
    ]);
  });

  it("should support three year tokens", () => {
    const formatter = new DateTimeFormatter();
    expect(formatter.stringify(DateTime.now(), "y yy yyyy")).toEqual(
      "2022 22 2022"
    );
  });

  it("should support five month tokens", () => {
    DateTimeConfiguration.addLocaleSupport(new FaGregorianLocale());
    const formatter = new DateTimeFormatter();
    const date = DateTime.fromObj({ year: 2021, month: 4, day: 8 });
    expect(formatter.stringify(date, "M MM MMM MMMM MMMMM", "fa")).toEqual(
      "4 04 آور آوریل آ"
    );

    DateTimeConfiguration.addLocaleSupport(new FaPersianLocale());
    const pdate = DateTime.fromObj(
      { year: 1400, month: 1, day: 12 },
      "persian"
    );
    expect(formatter.stringify(pdate, "M MM MMM MMMM MMMMM", "fa")).toEqual(
      "1 01 فرو فروردین ف"
    );
  });

  it("should support two day tokens", () => {
    const formatter = new DateTimeFormatter();
    expect(
      formatter.stringify(
        DateTime.fromObj({ year: 2021, month: 4, day: 8 }),
        "d dd"
      )
    ).toEqual("8 08");
  });

  it("should support four weekday tokens", () => {
    DateTimeConfiguration.addLocaleSupport(new FaGregorianLocale());
    const formatter = new DateTimeFormatter();
    const date = DateTime.fromObj({ year: 2021, month: 11, day: 22 });
    expect(formatter.stringify(date, "E EE EEE EEEE EEEEE", "fa")).toEqual(
      "1 01 دو دوشنبه د"
    );
  });

  it("should support four tokens for hour", () => {
    const formatter = new DateTimeFormatter();
    const time = DateTime.fromObj({ hour: 16, minute: 9, second: 26 });
    expect(formatter.stringify(time, "h hh")).toEqual("4 04");
    expect(formatter.stringify(time, "H HH")).toEqual("16 16");
  });

  it("should support two tokens for minute|second", () => {
    const formatter = new DateTimeFormatter();
    const time = new DateTime({ hour: 22, minute: 9, second: 26 });
    expect(formatter.stringify(time, "s ss")).toEqual("26 26");
    expect(formatter.stringify(time, "m mm")).toEqual("9 09");
  });
});
