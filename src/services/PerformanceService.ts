import { PerformanceMetrics } from '../types/diagnostics';

export class PerformanceService {
  async getPerformanceMetrics(): Promise<PerformanceMetrics> {
    const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paintTiming = performance.getEntriesByType('paint');
    
    const fpEntry = paintTiming.find(entry => entry.name === 'first-paint');
    const fcpEntry = paintTiming.find(entry => entry.name === 'first-contentful-paint');

    return {
      pageLoad: Math.round(navigationTiming?.loadEventEnd || 0),
      firstPaint: Math.round(fpEntry?.startTime || 0),
      firstContentfulPaint: Math.round(fcpEntry?.startTime || 0),
      domInteractive: Math.round(navigationTiming?.domInteractive || 0),
      resourceCount: performance.getEntriesByType('resource').length,
      memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
      timing: {
        dns: Math.round(navigationTiming?.domainLookupEnd - navigationTiming?.domainLookupStart || 0),
        tcp: Math.round(navigationTiming?.connectEnd - navigationTiming?.connectStart || 0),
        ttfb: Math.round(navigationTiming?.responseStart - navigationTiming?.requestStart || 0)
      }
    };
  }
}