import { BatteryInfo as BatteryInfoType } from '../types/diagnostics';
import { DiagnosticCard } from './DiagnosticCard';

interface BatteryInfoProps {
  info: BatteryInfoType;
}

export function BatteryInfo({ info }: BatteryInfoProps) {
  return (
    <DiagnosticCard title="Battery">
      <p>Level: {info.level}%</p>
      <p>Status: {info.charging ? 'Charging' : 'Not charging'}</p>
    </DiagnosticCard>
  );
}