import { SystemInfo } from '../types/diagnostics';

export class SystemService {
  getSystemInfo(): SystemInfo {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookiesEnabled: navigator.cookieEnabled,
      screenResolution: {
        width: window.screen.width,
        height: window.screen.height
      }
    };
  }
}
