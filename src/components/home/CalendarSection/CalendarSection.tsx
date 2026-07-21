import "./CalendarSection.css";

type CalendarSectionProps = {
  selectedDay: number;
  onDaySelect: (day: number) => void;
};

const month = "July";
const year = 2026;

const days = Array.from({ length: 31 }, (_, index) => index + 1);

export default function CalendarSection({
  selectedDay,
  onDaySelect,
}: CalendarSectionProps) {
  return (
    <section className="calendar-section">
      <header className="calendar-section__header">
        <h1 className="calendar-section__title">CALENDAR</h1>

        <p className="calendar-section__date">
          {month} {year}
        </p>
      </header>

      <div className="calendar-section__grid">
        {days.map((day) => (
          <button
            disabled={day === selectedDay}
            key={day}
            className={`calendar-section__day ${
              day === selectedDay ? "calendar-section__day--selected" : ""
            }`}
            onClick={() => onDaySelect(day)}
          >
            {day}
          </button>
        ))}
      </div>
    </section>
  );
}
