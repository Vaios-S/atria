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

  const questCountByDate = quests.reduce<Record<string, number>>(
    (counts, quest) => {
      if (!quest.scheduledDate) return counts;

      counts[quest.scheduledDate] = (counts[quest.scheduledDate] ?? 0) + 1;

      return counts;
    },
    {},
  );

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

        <nav
          className="calendar-section__navigation"
          aria-label="Calendar month navigation"
        >
          <button
            type="button"
            className="calendar-section__nav-button"
            onClick={handlePreviousMonth}
            aria-label="Previous month"
          >
            ←
          </button>

          <p
            className="calendar-section__date"
            aria-live="polite"
            aria-atomic="true"
          >
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
            aria-label="Go to today"
          >
            Today
          </button>
        </nav>
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
          const dateKey = format(day, "yyyy-MM-dd");
          const questCount = questCountByDate[dateKey] ?? 0;
          const hasQuest = questCount > 0;

          return (
            <button
              type="button"
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
                questCount === 1 ? "1 quest" : `${questCount} quests`
              }`}
              aria-current={isToday(day) ? "date" : undefined}
              aria-pressed={isSameDay(day, selectedDate)}
            >
              {hasQuest && (
                <span
                  className="calendar-section__quest-indicators"
                  aria-hidden="true"
                >
                  {Array.from({ length: Math.min(questCount, 3) }).map(
                    (_, index) => (
                      <span
                        key={index}
                        className="calendar-section__quest-indicator"
                      />
                    ),
                  )}

                  {questCount > 3 && (
                    <span className="calendar-section__quest-more">+</span>
                  )}
                </span>
              )}
              <span className="calendar-section__day-number">
                {format(day, "d")}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
