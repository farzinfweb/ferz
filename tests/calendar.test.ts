import { describe, it, expect } from "vitest";
import { Calendar } from "ferz";
import { PersianCalendar } from "ferz";
import { GregorianCalendar } from "ferz";
import { IslamicCalendar } from "ferz";

describe("Calendar", () => {
  it("should return the corresponding calendar instance given the name", () => {
    expect(Calendar.fromName("persian")).toBeInstanceOf(PersianCalendar);
    expect(Calendar.fromName("gregorian")).toBeInstanceOf(GregorianCalendar);
    expect(Calendar.fromName("islamic")).toBeInstanceOf(IslamicCalendar);
  });

  it("should throw an error if the name is not registered for any calendar", () => {
    expect(() => Calendar.fromName("gibberish")).toThrowError(
      "Calendar not found."
    );
  });
});
