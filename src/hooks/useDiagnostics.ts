// useDiagnostics.ts
import { useState } from 'react';
import { BatteryService } from '../services/BatteryService';
import { MemoryService } from '../services/MemoryService';
import { StorageService } from '../services/StorageService';
import { DiagnosticState } from '../types/diagnostics';

const batteryService = new BatteryService();
const memoryService = new MemoryService();
const storageService = new StorageService();

const initialState: DiagnosticState = {
  battery: null,
  memory: null,
  storage: null,
  isLoading: false,
  error: null,
  network: null,
  system: null,
  cpu: null,
  graphics: null,
  performance: null,
  security: null,
  device: null
};

export function useDiagnostics() {
  const [state, setState] = useState<DiagnosticState>(initialState);

  const runDiagnostics = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Fetch data for battery, memory, storage
      const [battery, storage] = await Promise.all([
        batteryService.getBatteryInfo(),
        storageService.getStorageInfo()
      ]);
      const memory = await memoryService.getMemoryInfo();
      
      // Fetch network info
      const network = await getNetworkInfo();

      // Fetch system info (example, you might use a custom API here)
      const system = await getSystemInfo();

      // Set the state with the gathered information
      setState({
        battery,
        memory,
        storage,
        isLoading: false,
        error: null,
        network,
        system,
        cpu: null, // Example: Fetch CPU info if needed
        graphics: null, // Example: Fetch Graphics info if needed
        performance: null, // Example: Fetch Performance data if needed
        security: null, // Example: Fetch Security data if needed
        device: null // Example: Fetch Device info if needed
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to run diagnostics. Please try again.'
      }));
    }
  };

  // Fetch Network Information
  const getNetworkInfo = async () => {
    if ('connection' in navigator) {
      const connection = (navigator as Navigator & { connection: NetworkInformation }).connection;
      return {
        type: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        connected: navigator.onLine,
        speed: connection.downlink || 0,
        online: navigator.onLine
      };
    } else {
      return { 
        type: 'Unknown', 
        downlink: 0, // Use 0 instead of 'N/A' to match the type
        rtt: 0,      // Use 0 instead of 'N/A' to match the type
        connected: false, 
        speed: 0, 
        online: false 
      };
    }
  };


  // Fetch System Information (example)
  const getSystemInfo = async () => {
    return {
      os: navigator.platform, // Using navigator for OS information
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform, // Added platform property
      cookiesEnabled: navigator.cookieEnabled, // Added cookiesEnabled property
      screenResolution: {
        width: window.innerWidth, // Get screen width
        height: window.innerHeight // Get screen height
      }
    };
  };

  return {
    diagnostics: state,
    runDiagnostics,
    isLoading: state.isLoading,
    error: state.error
  };
}
