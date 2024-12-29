import { SecurityInfo } from '../types/diagnostics';

export class SecurityService {
  async getSecurityInfo(): Promise<SecurityInfo> {
    return {
      https: window.location.protocol === 'https:',
      tls: this.getTLSVersion(),
      permissions: await this.getPermissions(),
      securityHeaders: await this.checkSecurityHeaders(),
      cookies: navigator.cookieEnabled,
      crossOriginIsolated: window.crossOriginIsolated || false
    };
  }

  private getTLSVersion(): string {
    const connection = (navigator as any).connection;
    if (connection?.type === 'cellular') {
      return connection.effectiveType === '4g' ? 'TLS 1.3' : 'TLS 1.2';
    }
    return 'Unknown';
  }

  private async getPermissions(): Promise<Record<string, string>> {
    const permissions: Record<string, string> = {};
    const items = ['camera', 'microphone', 'notifications', 'geolocation'];
    
    for (const item of items) {
      try {
        const status = await navigator.permissions.query({ name: item as PermissionName });
        permissions[item] = status.state;
      } catch {
        permissions[item] = 'unsupported';
      }
    }
    
    return permissions;
  }

  private async checkSecurityHeaders(): Promise<Record<string, boolean>> {
    try {
      const response = await fetch(window.location.href);
      const headers = response.headers;
      
      return {
        'Content-Security-Policy': headers.has('content-security-policy'),
        'X-Content-Type-Options': headers.has('x-content-type-options'),
        'X-Frame-Options': headers.has('x-frame-options'),
        'Strict-Transport-Security': headers.has('strict-transport-security')
      };
    } catch {
      return {};
    }
  }
}
