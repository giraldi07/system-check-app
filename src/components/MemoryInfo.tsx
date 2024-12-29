import { MemoryInfo as MemoryInfoType } from '../types/diagnostics';
import { DiagnosticCard } from './DiagnosticCard';

interface MemoryInfoProps {
  info: MemoryInfoType;
}

export function MemoryInfo({ info }: MemoryInfoProps) {
  return (
    <DiagnosticCard title="Memory">
      <p>Total: {info.total} MB</p>
      <p>Used: {info.used} MB</p>
      <p>Available: {info.available} MB</p>
    </DiagnosticCard>
  );
}