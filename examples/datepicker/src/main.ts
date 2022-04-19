import DatePicker from "@ferz/datepicker";
import { FaPersianLocale } from "@ferz/locales";
import { DateTime, PersianCalendar } from "ferz";
import "@ferz/datepicker/css";

const calendar = new PersianCalendar();

const datepicker = new DatePicker(
  document.querySelector(".basic-test") as HTMLInputElement,
  calendar,
  new FaPersianLocale(),
  { startOfWeek: 6, direction: "rtl" }
);
