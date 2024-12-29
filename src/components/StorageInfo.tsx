import { StorageInfo as StorageInfoType } from '../types/diagnostics';
import { DiagnosticCard } from './DiagnosticCard';

interface StorageInfoProps {
  info: StorageInfoType;
}

export function StorageInfo({ info }: StorageInfoProps) {
  return (
    <DiagnosticCard title="Storage">
      <p>Total: {info.total} MB</p>
      <p>Used: {info.used} MB</p>
      <p>Available: {info.available} MB</p>
    </DiagnosticCard>
  );
}