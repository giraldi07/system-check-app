import * as Device from 'expo-device';
import * as SystemInfo from 'expo-system-info';

export class DeviceService {
  async getDeviceInfo() {
    const totalMemory = await SystemInfo.getTotalMemoryAsync();
    const freeMemory = await SystemInfo.getFreeMemoryAsync();
    
    return {
      model: Device.modelName,
      brand: Device.brand,
      osVersion: Device.osVersion,
      memory: {
        total: Math.round(totalMemory / (1024 * 1024)),
        free: Math.round(freeMemory / (1024 * 1024)),
        used: Math.round((totalMemory - freeMemory) / (1024 * 1024))
      }
    };
  }
}

