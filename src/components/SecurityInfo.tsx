import { SecurityInfo as SecurityInfoType } from '../types/diagnostics';
import { DiagnosticCard } from './DiagnosticCard';

interface SecurityInfoProps {
  info: SecurityInfoType;
}

export function SecurityInfo({ info }: SecurityInfoProps) {
  return (
    <DiagnosticCard 
      title="Security Status"
      icon="shield"
      status={info.https ? 'success' : 'error'}
    >
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span>HTTPS</span>
          <span className={`px-2 py-1 rounded text-sm ${
            info.https ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {info.https ? 'Enabled' : 'Disabled'}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span>TLS Version</span>
          <span className="text-gray-600">{info.tls}</span>
        </div>

        <div>
          <h4 className="font-medium mb-2">Permissions</h4>
          <div className="space-y-1">
            {Object.entries(info.permissions).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="capitalize">{key}</span>
                <span className={`px-2 py-0.5 rounded ${
                  value === 'granted' ? 'bg-green-100 text-green-800' :
                  value === 'denied' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DiagnosticCard>
  );
}