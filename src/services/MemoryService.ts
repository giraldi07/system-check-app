import { MemoryInfo } from '../types/diagnostics';

export class MemoryService {
  getMemoryInfo(): MemoryInfo | null {
    try {
      // @ts-ignore - Performance Memory API
      const memory = performance?.memory;
      if (!memory) return null;

      return {
        total: Math.round(memory.jsHeapSizeLimit / (1024 * 1024)),
        used: Math.round(memory.usedJSHeapSize / (1024 * 1024)),
        free: Math.round((memory.jsHeapSizeLimit - memory.usedJSHeapSize) / (1024 * 1024)),
        available: Math.round((memory.jsHeapSizeLimit - memory.usedJSHeapSize) / (1024 * 1024)), // Sama dengan free
      };
    } catch (error) {
      console.error('Memory API error:', error);
      return null;
    }
  }
}
