import { CPUInfo } from '../types/diagnostics';

export class CPUService {
  async getCPUInfo(): Promise<CPUInfo> {
    const logicalProcessors = navigator.hardwareConcurrency || 0;
    
    return {
      logicalProcessors,
      architecture: this.getArchitecture(),
      performance: await this.measurePerformance(),
      usage: await this.getCPUUsage()
    };
  }

  private getArchitecture(): string {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('arm')) return 'ARM';
    if (userAgent.includes('x86_64') || userAgent.includes('x64')) return 'x86_64';
    if (userAgent.includes('x86') || userAgent.includes('i386')) return 'x86';
    return 'Unknown';
  }

  private async measurePerformance(): Promise<number> {
    const startTime = performance.now();
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.sqrt(i);
    }
    return Math.round(performance.now() - startTime);
  }

  private async getCPUUsage(): Promise<number> {
    const t1 = performance.now();
    await new Promise(resolve => setTimeout(resolve, 100));
    const t2 = performance.now();
    return Math.min(100, Math.round((t2 - t1) / 100 * 100));
  }
}