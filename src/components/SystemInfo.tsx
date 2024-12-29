import { SystemInfo as SystemInfoType } from '../types/diagnostics';
import { DiagnosticCard } from './DiagnosticCard';

interface SystemInfoProps {
  info: SystemInfoType;
}

export function SystemInfo({ info }: SystemInfoProps) {
  return (
    <DiagnosticCard 
      title="System Information"
      icon="computer"
    >
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span>Platform</span>
          <span className="text-gray-600">{info.platform}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Language</span>
          <span className="text-gray-600">{info.language}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Resolution</span>
          <span className="text-gray-600">
            {info.screenResolution.width} x {info.screenResolution.height}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Cookies</span>
          <span className={`px-2 py-1 rounded text-sm ${
            info.cookiesEnabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {info.cookiesEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>
    </DiagnosticCard>
  );
}