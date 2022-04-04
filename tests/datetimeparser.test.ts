import { describe, it, expect } from "vitest";
import { DateTimeParser } from "../src/DateTimeParser";

describe("DateTimeParser", () => {
  it("should parse simple iso datetime strings", () => {
    const parser = new DateTimeParser();
    const components = parser.fromISO("2017-09-04T19:24:15");
    expect([components.year, components.month, components.day]).toStrictEqual([
      2017, 9, 4,
    ]);
    expect([
      components.hour,
      components.minute,
      components.second,
    ]).toStrictEqual([19, 24, 15]);
  });

  it("should set components not present to zero", () => {
    const parser = new DateTimeParser();
    const components = parser.fromISO("2017-09-04");
    expect([components.year, components.month, components.day]).toStrictEqual([
      2017, 9, 4,
    ]);
    expect([
      components.hour,
      components.minute,
      components.second,
    ]).toStrictEqual([0, 0, 0]);
  });
});
