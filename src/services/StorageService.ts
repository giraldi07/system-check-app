import { StorageInfo } from '../types/diagnostics';

export class StorageService {
  async getStorageInfo(): Promise<StorageInfo | null> {
    try {
      // @ts-ignore - Storage API
      const storage = await navigator.storage.estimate();
      
      if (storage.quota === undefined || storage.usage === undefined) {
        console.error('Quota or usage is undefined');
        return null;
      }

      // Menghitung 'free' berdasarkan 'available'
      const available = Math.round((storage.quota - storage.usage) / (1024 * 1024));
      
      return {
        total: Math.round(storage.quota / (1024 * 1024)),
        used: Math.round(storage.usage / (1024 * 1024)),
        available: available,
        free: available // Misalnya, anggap 'free' sama dengan 'available'
      };
    } catch (error) {
      console.error('Storage API error:', error);
      return null;
    }
  }
}
