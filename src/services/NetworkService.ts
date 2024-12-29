import { NetworkInfo } from '../types/diagnostics';

export class NetworkService {
  getNetworkInfo(): NetworkInfo {
    const connection = (navigator as any).connection;

    return {
      type: connection?.type || 'unknown',
      connected: navigator.onLine,
      speed: connection?.downlink || 0,
      online: navigator.onLine, // Properti tambahan
    };
  }
}
