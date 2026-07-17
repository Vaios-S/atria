import "./Panel.css";

type PanelProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Panel({ children, className = "" }: PanelProps) {
  return <section className={`panel ${className}`}>{children}</section>;
}
