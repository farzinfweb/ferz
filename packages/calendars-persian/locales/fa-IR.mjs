export default {
  name: "fa",
  forCalendar: "persian",
  monthNamesFull: () => {
    return "\u0641\u0631\u0648\u0631\u062F\u06CC\u0646|\u0627\u0631\u062F\u06CC\u0628\u0647\u0634\u062A|\u062E\u0631\u062F\u0627\u062F|\u062A\u06CC\u0631|\u0645\u0631\u062F\u0627\u062F|\u0634\u0647\u0631\u06CC\u0648\u0631|\u0645\u0647\u0631|\u0622\u0628\u0627\u0646|\u0622\u0630\u0631|\u062F\u06CC|\u0628\u0647\u0645\u0646|\u0627\u0633\u0641\u0646\u062F".split(
      "|"
    );
  },
  monthNamesShort: () => {
    return "\u0641\u0631\u0648|\u0627\u0631\u062F|\u062E\u0631\u062F|\u062A\u06CC\u0631|\u0645\u0631\u062F|\u0634\u0647\u0631|\u0645\u0647\u0631|\u0622\u0628\u0627|\u0622\u0630\u0631|\u062F\u06CC|\u0628\u0647\u0645|\u0627\u0633\u0641".split("|");
  },
  monthNamesNarrow: () => {
    return "\u0641|\u0627\u0631|\u062E|\u062A|\u0645\u0631|\u0634|\u0645\u0647|\u0622\u0628|\u0622\u0630|\u062F|\u0628|\u0627\u0633".split("|");
  },
  weekdaysFull: () => {
    return "\u062F\u0648\u0634\u0646\u0628\u0647|\u0633\u0647\u200C\u0634\u0646\u0628\u0647|\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647|\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647|\u062C\u0645\u0639\u0647|\u0634\u0646\u0628\u0647|\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647".split(
      "|"
    );
  },
  weekdaysShort: () => {
    return "\u062F\u0648\u0634\u0646\u0628\u0647|\u0633\u0647\u200C\u0634\u0646\u0628\u0647|\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647|\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647|\u062C\u0645\u0639\u0647|\u0634\u0646\u0628\u0647|\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647".split(
      "|"
    );
  },
  weekdaysNarrow: () => {
    return "\u062F|\u0633|\u0686|\u067E|\u062C|\u0634|\u06CC".split("|");
  }
};