import DatePicker from "@ferz/datepicker";
import { FaPersianLocale } from "@ferz/locales";
import { PersianCalendar } from "ferz";

const datepicker = new DatePicker(
  document.querySelector(".basic-test") as HTMLInputElement,
  new PersianCalendar(),
  new FaPersianLocale(),
  {}
);
