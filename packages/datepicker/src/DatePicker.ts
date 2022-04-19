import { Calendarable, DateTimeConfiguration } from "ferz";
import { DateTime } from "ferz";
import { Localeable } from "@ferz/locales";
import { DatePickerOptions, DatePickerDefaults } from "./DatePickerOptions";

class DatePicker {
  private input: HTMLInputElement;

  private calendar: Calendarable;

  private locale: Localeable;

  private options: DatePickerOptions;

  private today: DateTime;

  private selectedDate: DateTime | null = null;

  private isActive: boolean = false;

  private activeStartOfMonth: DateTime | null = null;

  private selectedDateButton: HTMLButtonElement | null = null;

  private refs: {
    container: HTMLDivElement;
    body: HTMLDivElement;
    header: HTMLDivElement;
    dateTable?: HTMLTableElement;
  };

  private headerRefs: {
    title: HTMLDivElement;
    prevButton: HTMLButtonElement;
    nextButton: HTMLButtonElement;
  };

  private bodyRefs: {
    table: HTMLTableElement;
    thead: HTMLTableSectionElement;
    tbody: HTMLTableSectionElement;
  };

  constructor(
    element: HTMLInputElement,
    calendar: Calendarable,
    locale: Localeable,
    options: DatePickerOptions = {}
  ) {
    this.input = element;

    this.calendar = calendar;

    this.locale = locale;
    DateTimeConfiguration.addLocaleSupport(locale);

    this.options = { ...DatePickerDefaults, ...options };

    this.today = DateTime.now(this.calendar);

    if (this.options.initialDate) {
      this.selectedDate = this.options.initialDate;
      this.input.value = this.options.initialDate.stringifyWith(
        "yyyy-MM-dd",
        this.locale.name
      );
    }

    this.refs = this.makeSkeleton();
    this.headerRefs = this.makeHeaderSkeleton();
    this.bodyRefs = this.makeBodySkeleton();
    this.init();
    this.apply(this.today.startOf("month"));

    this.bindListeners(this.refs.container);
  }

  private makeSkeleton() {
    const container = document.createElement("div");
    const body = document.createElement("div");
    const header = document.createElement("div");
    header.classList.value = "fdp-header";
    body.classList.value = "fdp-body";
    container.classList.value = `fdp-container fdp-${this.options.direction}`;
    return { container, header, body };
  }

  private makeHeaderSkeleton() {
    const title = document.createElement("div");
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");
    prevButton.type = "button";
    nextButton.type = "button";
    prevButton.classList.value = "fdp-arrow fdp-prev";
    nextButton.classList.value = "fdp-arrow fdp-next";
    const rightArrowPoints = "96 48 176 128 96 208";
    const leftArrowPoints = "160 208 80 128 160 48";
    const arrowTemplate =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polyline points="||p||" fill="none" stroke="#004080" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline></svg>';
    prevButton.innerHTML = arrowTemplate.replace(
      "||p||",
      this.isRTL ? rightArrowPoints : leftArrowPoints
    );
    nextButton.innerHTML = arrowTemplate.replace(
      "||p||",
      this.isRTL ? leftArrowPoints : rightArrowPoints
    );

    return { title, prevButton, nextButton };
  }

  private makeBodySkeleton() {
    const table = document.createElement("table");
    table.classList.value = "fdp-table";
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    return { table, tbody, thead };
  }

  private init() {
    // header section
    this.refs.header.appendChild(this.headerRefs.prevButton);
    this.refs.header.appendChild(this.headerRefs.title);
    this.refs.header.appendChild(this.headerRefs.nextButton);
    this.refs.container.appendChild(this.refs.header);

    // body section
    const theadrow = document.createElement("tr");
    const weekdays = this.locale.weekdaysNarrow();
    weekdays
      .concat(weekdays.splice(0, this.options.startOfWeek! - 1))
      .forEach((wd) => {
        const th = document.createElement("th");
        th.innerText = wd;
        theadrow.appendChild(th);
      });
    this.bodyRefs.thead.appendChild(theadrow);
    this.bodyRefs.table.appendChild(this.bodyRefs.thead);
    this.bodyRefs.table.appendChild(this.bodyRefs.tbody);
    this.refs.body.appendChild(this.bodyRefs.table);
    this.refs.container.appendChild(this.refs.body);

    // position the container
    const inputRect = this.input.getBoundingClientRect();
    this.refs.container.style.top = inputRect.bottom + window.scrollY + "px";
    if (!this.isRTL) this.refs.container.style.left = inputRect.left + "px";
    else
      this.refs.container.style.right =
        window.innerWidth - inputRect.right + "px";
    this.refs.container.style.zIndex = "10";
    this.refs.container.style.display = "none";

    document.body.appendChild(this.refs.container);
  }

  private apply(start: DateTime) {
    this.activeStartOfMonth = start;
    this.headerRefs.title.innerHTML = this.headerTitle(this.activeStartOfMonth);
    const newBody = this.dateTableBody(this.activeStartOfMonth);
    this.bodyRefs.table.replaceChild(newBody, this.bodyRefs.tbody);
    this.bodyRefs.tbody = newBody;
  }

  private bindListeners(container: HTMLElement) {
    this.input.onfocus = (e: FocusEvent) => {
      this.isActive = true;
      container.style.display = "block";
    };

    document.onclick = (e: MouseEvent) => {
      if (!this.isActive) return false;
      const target = e.target as HTMLElement;
      if (!container.contains(target) && !this.input.isEqualNode(target)) {
        this.isActive = false;
        container.style.display = "none";
      }
    };

    this.bodyRefs.table.onclick = (e: MouseEvent) => {
      let target = e.target as HTMLElement;
      if (
        target.classList.contains("fdp-day-button-content") ||
        target.classList.contains("fdp-day-button")
      ) {
        if (target.tagName === "SPAN") {
          target = target.closest("button") as HTMLButtonElement;
        }
        const jd = parseFloat(target.getAttribute("data-jd") ?? "");
        this.selectedDate = new DateTime(
          this.calendar.fromJd(jd),
          this.calendar
        );
        this.input.value = this.selectedDate.stringifyWith(
          "yyyy-MM-dd",
          this.locale.name
        );
        target.classList.add("fdp-date-selected");
        this.selectedDateButton?.classList.remove("fdp-date-selected");
        this.selectedDateButton = target as HTMLButtonElement;
      }
    };

    this.headerRefs.prevButton.onclick = (e: MouseEvent) => {
      this.activeStartOfMonth = this.activeStartOfMonth!.subtractMonths(1);
      this.apply(this.activeStartOfMonth);
    };

    this.headerRefs.nextButton.onclick = (e: MouseEvent) => {
      this.activeStartOfMonth = this.activeStartOfMonth!.addMonths(1);
      this.apply(this.activeStartOfMonth);
    };
  }

  private get isRTL(): boolean {
    return this.options.direction === "rtl";
  }

  private dateTableBody(startOfMonth: DateTime) {
    const startIndex =
      (startOfMonth.weekday + (7 - this.options.startOfWeek!)) % 7;
    const endIndex = startIndex + startOfMonth.daysInMonth - 1;
    const tbody = document.createElement("tbody");
    let currentRow = document.createElement("tr");
    new Array(42).fill(null).forEach((_, index) => {
      if (index !== 0 && index % 7 === 0) {
        tbody.append(currentRow);
        currentRow = document.createElement("tr");
      }
      const el =
        index < startIndex
          ? null
          : index > endIndex
          ? null
          : index - startIndex + 1;
      const td = document.createElement("td");
      if (el) {
        const bt = document.createElement("button");
        bt.classList.value = "fdp-day-button";
        if (this.selectedDate && this.isDateSelected(startOfMonth, el)) {
          bt.classList.add("fdp-date-selected");
          this.selectedDateButton = bt;
        }
        bt.type = "button";
        bt.setAttribute("data-jd", `${startOfMonth.jd + el - 1}`);
        const btspan = document.createElement("span");
        btspan.innerText = el.toString();
        btspan.classList.value = "fdp-day-button-content";
        bt.appendChild(btspan);
        td.appendChild(bt);
      }
      currentRow.appendChild(td);
    });
    tbody.append(currentRow);
    return tbody;
  }

  private headerTitle(date: DateTime) {
    return date.stringifyWith("MMMM yyyy", this.locale.name);
  }

  private isDateSelected(date: DateTime, day: number) {
    return (
      this.selectedDate &&
      this.selectedDate.year === date.year &&
      this.selectedDate.month === date.month &&
      this.selectedDate.day === day
    );
  }
}

export default DatePicker;
