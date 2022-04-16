import type { Calendarable } from "ferz";
import { DateTime } from "ferz";
import { Localeable } from "@ferz/locales";
import { DatePickerOptions, DatePickerDefaults } from "./DatePickerOptions";

class DatePicker {
  private input: HTMLInputElement;

  private calendar: Calendarable;

  private locale: Localeable;

  private options: DatePickerOptions;

  constructor(
    element: HTMLInputElement,
    calendar: Calendarable,
    locale: Localeable,
    options: DatePickerOptions = {}
  ) {
    this.input = element;

    this.calendar = calendar;

    this.locale = locale;

    this.options = { ...DatePickerDefaults, ...options };

    this.drawContainer();
  }

  private drawContainer(): void {
    const container = document.createElement("div");
    container.classList.add("ferz-dp-container");
    container.appendChild(this.makeDateTable());
    document.body.appendChild(container);
  }

  private makeDateTable() {
    let structure = new Array(42).fill(null);
    const today = DateTime.now(this.calendar);
    const startIndex = today.startOf("month").weekday;
    const daysInMonth = today.daysInMonth;
    const endIndex = startIndex + daysInMonth - 1;
    structure = structure.map((_, index) => {
      return index < startIndex
        ? null
        : index > endIndex
        ? null
        : index - startIndex + 1;
    });
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const theadrow = document.createElement("tr");
    const tbody = document.createElement("tbody");

    this.locale.weekdaysNarrow().forEach((wd) => {
      const th = document.createElement("th");
      th.innerText = wd;
      theadrow.appendChild(th);
    });
    thead.appendChild(theadrow);
    let currentRow = document.createElement("tr");
    tbody.append(currentRow);
    structure.map((el, index) => {
      if (index !== 0 && index % 7 === 0) {
        currentRow = document.createElement("tr");
        tbody.append(currentRow);
      }
      const td = document.createElement("td");
      td.innerText = el ?? "";
      currentRow.appendChild(td);
    });
    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
  }
}

export default DatePicker;
