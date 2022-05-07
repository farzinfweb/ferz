import type { DateTime } from "ferz";

export interface DatePickerOptions {
  startOfWeek?: number;
  direction?: "rtl" | "ltr";
  initialDate?: DateTime;
  closeOnSelect?: boolean;
  outputFormat?: string;
}

export const DatePickerDefaults: DatePickerOptions = {
  startOfWeek: 1,
  direction: "rtl",
  closeOnSelect: false,
  outputFormat: "yyyy-MM-dd",
};
