export interface Localeable {
  name: string;
  forCalendar: string;

  monthNamesFull(): string[];
  monthNamesShort(): string[];
  monthNamesNarrow(): string[];
  weekdaysFull(): string[];
  weekdaysShort(): string[];
  weekdaysNarrow(): string[];
}
