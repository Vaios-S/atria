import "./CalendarSection.css";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  format,
  getDay,
  addMonths,
  subMonths,
} from "date-fns";

type CalendarSectionProps = {
  selectedDate: Date;
  onDaySelect: (date: Date) => void;
};

export default function CalendarSection({
  selectedDate,
  onDaySelect,
}: CalendarSectionProps) {
  const days = eachDayOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate),
  });

  const firstDayOfMonth = startOfMonth(selectedDate);

  const startDay = getDay(firstDayOfMonth);

  const emptyDays = startDay === 0 ? 6 : startDay - 1;

  function handlePreviousMonth() {
    onDaySelect(subMonths(selectedDate, 1));
  }

  function handleNextMonth() {
    onDaySelect(addMonths(selectedDate, 1));
  }

  return (
    <section className="calendar-section">
      <header className="calendar-section__header">
        <h1 className="calendar-section__title">CALENDAR</h1>

        <div className="calendar-section__navigation">
          <button
            type="button"
            className="calendar-section__nav-button"
            onClick={handlePreviousMonth}
            aria-label="Previous month"
          >
            ←
          </button>

          <p className="calendar-section__date">
            {format(selectedDate, "MMMM yyyy")}
          </p>

          <button
            type="button"
            className="calendar-section__nav-button"
            onClick={handleNextMonth}
            aria-label="Next month"
          >
            →
          </button>
        </div>
      </header>

      <div className="calendar-section__weekday">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="calendar-section__grid">
        {Array.from({ length: emptyDays }).map((_, index) => (
          <div key={`empty-${index}`} className="calendar-section__empty-day" />
        ))}
        {days.map((day) => (
          <button
            disabled={isSameDay(day, selectedDate)}
            key={day.toISOString()}
            className={`calendar-section__day ${
              isSameDay(day, selectedDate)
                ? "calendar-section__day--selected"
                : ""
            }`}
            onClick={() => onDaySelect(day)}
          >
            {format(day, "d")}
          </button>
        ))}
      </div>
    </section>
  );
}
