import type { DateTime } from "ferz";

export interface DatePickerOptions {
  startOfWeek?: number;
  direction?: "rtl" | "ltr";
  initialDate?: DateTime;
}

export const DatePickerDefaults: DatePickerOptions = {
  startOfWeek: 1,
  direction: "rtl",
};
