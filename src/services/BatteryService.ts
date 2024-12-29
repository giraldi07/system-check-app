import { BatteryInfo } from '../types/diagnostics';

export class BatteryService {
  async getBatteryInfo(): Promise<BatteryInfo | null> {
    try {
      // @ts-ignore - Battery API types
      const battery = await navigator.getBattery();
      
      // Determine the state based on charging status
      const state = battery.charging ? 'charging' : 'discharging';

      return {
        level: Math.round(battery.level * 100),
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
        state: state, // Add the state property here
      };
    } catch (error) {
      console.error('Battery API error:', error);
      return null;
    }
  }
}
