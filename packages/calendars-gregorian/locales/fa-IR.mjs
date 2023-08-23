export default {
  name: "fa",
  forCalendar: "gregorian",
  monthNamesFull: () => {
    return "\u0698\u0627\u0646\u0648\u06CC\u0647|\u0641\u0648\u0631\u06CC\u0647|\u0645\u0627\u0631\u0633|\u0622\u0648\u0631\u06CC\u0644|\u0645\u0647|\u0698\u0648\u0626\u0646|\u0698\u0648\u0626\u06CC\u0647|\u0627\u0648\u062A|\u0633\u067E\u062A\u0627\u0645\u0628\u0631|\u0627\u06A9\u062A\u0628\u0631|\u0646\u0648\u0627\u0645\u0628\u0631|\u062F\u0633\u0627\u0645\u0628\u0631".split(
      "|"
    );
  },
  monthNamesShort: () => {
    return "\u0698\u0627\u0646|\u0641\u0648\u0631|\u0645\u0627\u0631|\u0622\u0648\u0631|\u0645\u0647|\u0698\u0648\u0626\u0646|\u0698\u0648\u0626\u06CC\u0647|\u0627\u0648\u062A|\u0633\u067E\u062A|\u0627\u06A9\u062A|\u0646\u0648\u0627|\u062F\u0633\u0627".split("|");
  },
  monthNamesNarrow: () => {
    return "\u0698|\u0641|\u0645|\u0622|\u0645\u0647|\u0698\u0648|\u0698\u0648|\u0627\u0648|\u0633|\u0627\u06A9|\u0646|\u062F".split("|");
  },
  weekdaysFull: () => {
    return "\u062F\u0648\u0634\u0646\u0628\u0647|\u0633\u0647\u200C\u0634\u0646\u0628\u0647|\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647|\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647|\u062C\u0645\u0639\u0647|\u0634\u0646\u0628\u0647|\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647".split(
      "|"
    );
  },
  weekdaysShort: () => {
    return "\u062F\u0648|\u0633\u0647|\u0686\u0647\u0627\u0631|\u067E\u0646\u062C|\u062C\u0645\u0639\u0647|\u0634\u0646\u0628\u0647|\u06CC\u06A9".split("|");
  },
  weekdaysNarrow: () => {
    return "\u062F|\u0633|\u0686|\u067E|\u062C|\u0634|\u06CC".split("|");
  }
};
