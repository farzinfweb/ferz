import { describe, it, expect, vi } from "vitest";
import { DateTime } from "ferz";
import { GregorianCalendar } from "ferz";
import { PersianCalendar } from "ferz";
import { DateTimeComponents } from "ferz";
import { DateTimeFormatter } from "ferz";

describe("DateTime", () => {
  it("should set the calendar passed", () => {
    const date = DateTime.now(new PersianCalendar());
    expect(date.calendar.name).toBe("persian");
  });

  it("should set the initial date config correctly", () => {
    const date = DateTime.fromObj(
      { year: 1399, month: 10, day: 25 },
      new PersianCalendar()
    );
    expect([date.year, date.month, date.day]).toStrictEqual([1399, 10, 25]);
  });

  it("should set the default calendar", () => {
    DateTime.setDefaultCalendar(new PersianCalendar());
    expect(DateTime.now().calendar.name).toBe("persian");
  });

  it("should set the time config correctly", () => {
    const time = DateTime.fromObj(
      { hour: 22, minute: 56, second: 32 },
      new PersianCalendar()
    );
    expect([time.hour, time.minute, time.second]).toStrictEqual([22, 56, 32]);
  });

  it("should also accept calendar names as string", () => {
    expect(DateTime.now("persian").calendar.name).toBe("persian");
  });

  it("should format dates to iso when asked", () => {
    const date = DateTime.fromISO("2017-09-04T19:24:15");
    expect(date.toISO()).toBe("2017-09-04T19:24:15");
  });

  it("should invoke the formatter class when asked to format", () => {
    const formatter = new DateTimeFormatter();
    const spy = vi.spyOn(formatter, "stringify");
    const date = DateTime.now();
    date.stringifyWith("yyyy-mm-dd", "fa", formatter);
    expect(spy).toHaveBeenCalledWith(date, "yyyy-mm-dd", "fa");
  });

  it("should call the datetimeparser correctly", () => {
    const components = DateTime.fromISO("2017-09-04T19:24:15");
    expect([components.year, components.month, components.day]).toStrictEqual([
      2017, 9, 4,
    ]);
    expect([
      components.hour,
      components.minute,
      components.second,
    ]).toStrictEqual([19, 24, 15]);
  });

  it("should respect the calendar when getting the current date", () => {
    const persian = new PersianCalendar();
    const now = DateTime.now("persian");
    const components = persian.fromJd(
      new GregorianCalendar().toJd(DateTimeComponents.fromJSDate(new Date()))
    );
    expect([now.year, now.month, now.day]).toStrictEqual([
      components.year,
      components.month,
      components.day,
    ]);

    const jsNow = new Date();
    const now1 = DateTime.now("gregorian");
    expect(now1.year).toBe(jsNow.getFullYear());
  });

  it("should use the default calendar when non passed to now()", () => {
    DateTime.setDefaultCalendar(new GregorianCalendar());
    const now = DateTime.now();
    const nowJs = new Date();

    expect(nowJs.valueOf() - now.valueOf()).toBeLessThan(100);
  });

  it("should subtract days correctly", () => {
    const date = DateTime.fromISO("2020-12-05");
    expect(date.subtractDays(7).stringifyWith("yyyy-MM-dd")).toBe("2020-11-28");
  });

  it("should add days correctly", () => {
    const date = DateTime.fromISO("2020-12-26", "gregorian");
    expect(date.addDays(7).stringifyWith("yyyy-MM-dd")).toBe("2021-01-02");
  });
});
