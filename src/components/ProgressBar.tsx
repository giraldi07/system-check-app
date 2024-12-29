
interface ProgressBarProps {
  value: number;
  max: number;
  colorClass?: string;
}

export function ProgressBar({ value, max, colorClass = 'bg-blue-500' }: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100);
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className={`h-2.5 rounded-full ${colorClass}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}