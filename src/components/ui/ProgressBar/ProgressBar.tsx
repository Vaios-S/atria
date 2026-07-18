import "./ProgressBar.css";

type ProgressBarProps = {
  value: number;
  max: number;
};

export default function ProgressBar({ value, max }: ProgressBarProps) {
  const percentage = (value / max) * 100;

  return (
    <div className="progress-bar">
      <div className="progress-bar__fill" style={{ width: `${percentage}%` }} />
    </div>
  );
}
