import { NetworkInfo as NetworkInfoType } from '../types/diagnostics';
import { DiagnosticCard } from './DiagnosticCard';

interface NetworkInfoProps {
  info: NetworkInfoType;
}

export function NetworkInfo({ info }: NetworkInfoProps) {
  return (
    <DiagnosticCard 
      title="Network"
      icon="wifi"
      status={info.online ? 'success' : 'error'}
    >
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span>Status</span>
          <span className={`px-2 py-1 rounded text-sm ${
            info.online ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {info.online ? 'Online' : 'Offline'}
          </span>
        </div>
        {info.effectiveType && (
          <div className="flex justify-between items-center">
            <span>Connection</span>
            <span className="text-gray-600">{info.effectiveType}</span>
          </div>
        )}
        {info.downlink && (
          <div className="flex justify-between items-center">
            <span>Speed</span>
            <span className="text-gray-600">{info.downlink} Mbps</span>
          </div>
        )}
        {info.rtt && (
          <div className="flex justify-between items-center">
            <span>Latency</span>
            <span className="text-gray-600">{info.rtt} ms</span>
          </div>
        )}
      </div>
    </DiagnosticCard>
  );
}