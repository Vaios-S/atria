// React

// Libraries
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  format,
  getDay,
  addMonths,
  subMonths,
  isToday,
  isWeekend,
} from "date-fns";

// Components

// Utils / constants

//Types
import type { Quest } from "../../../types/quest";

//Styles
import "./CalendarSection.css";

type CalendarSectionProps = {
  selectedDate: Date;
  onDaySelect: (date: Date) => void;
  quests: Quest[];
};

export default function CalendarSection({
  selectedDate,
  onDaySelect,
  quests,
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
          <button
            type="button"
            className="calendar-section__today-button"
            onClick={() => onDaySelect(new Date())}
          >
            Today
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
        {days.map((day) => {
          const dayQuests = quests.filter(
            (quest) => quest.scheduledDate === format(day, "yyyy-MM-dd"),
          );
          const hasQuest = dayQuests.length > 0;

          return (
            <button
              disabled={isSameDay(day, selectedDate)}
              key={day.toISOString()}
              className={`calendar-section__day ${
                isSameDay(day, selectedDate)
                  ? "calendar-section__day--selected"
                  : ""
              } ${isToday(day) ? "calendar-section__day--today" : ""} ${
                isWeekend(day) ? "calendar-section__day--weekend" : ""
              }`}
              onClick={() => onDaySelect(day)}
              aria-label={`${format(day, "MMMM d, yyyy")}, ${
                dayQuests.length === 1
                  ? "1 quest"
                  : `${dayQuests.length} quests`
              }`}
            >
              {hasQuest && (
                <span
                  className="calendar-section__quest-indicator"
                  aria-hidden="true"
                />
              )}
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </section>
  );
}
