import DatePicker from "@ferz/datepicker";
import FaPersianLocale from "@ferz/persian-calendar/locales/fa-IR";
import { DateTime } from "ferz";
import PersianCalendar from "@ferz/persian-calendar";
import GregorianCalendar from "@ferz/gregorian-calendar";
import "@ferz/datepicker/css";

const calendar = new PersianCalendar();
const testButton = document.querySelector(".test-button") as HTMLButtonElement;

const datepicker = new DatePicker(
  document.querySelector(".basic-test") as HTMLInputElement,
  calendar,
  FaPersianLocale,
  {
    startOfWeek: 6,
    direction: "rtl",
    closeOnSelect: true,
    outputFormat: "yyyy/MM/d",
  }
);

datepicker.onSelect((date: DateTime) => {
  console.log(date.toCalendar(new GregorianCalendar()).toISO());
});

testButton.addEventListener("click", () => {
  datepicker.setDate(
    DateTime.fromObj({ year: 1401, month: 5, day: 10 }, new PersianCalendar())
  );
});
