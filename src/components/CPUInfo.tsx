import { CPUInfo as CPUInfoType } from '../types/diagnostics';
import { DiagnosticCard } from './DiagnosticCard';
import { ProgressBar } from './ProgressBar';

interface CPUInfoProps {
  info: CPUInfoType;
}

export function CPUInfo({ info }: CPUInfoProps) {
  return (
    <DiagnosticCard 
      title="CPU Information"
      icon="cpu"
    >
      <div className="space-y-3">
        <div>
          <div className="flex justify-between mb-1">
            <span>CPU Usage</span>
            <span>{info.usage}%</span>
          </div>
          <ProgressBar 
            value={info.usage} 
            max={100} 
            colorClass={info.usage > 80 ? 'bg-red-500' : 'bg-blue-500'} 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-600">Processors:</span>
            <span className="ml-2 font-medium">{info.logicalProcessors}</span>
          </div>
          <div>
            <span className="text-gray-600">Architecture:</span>
            <span className="ml-2 font-medium">{info.architecture}</span>
          </div>
          <div>
            <span className="text-gray-600">Performance:</span>
            <span className="ml-2 font-medium">{info.performance}ms</span>
          </div>
        </div>
      </div>
    </DiagnosticCard>
  );
}