// Previous interfaces remain unchanged...

export interface CPUInfo {
  logicalProcessors: number; // Jumlah prosesor logis
  architecture: string; // Arsitektur CPU (contoh: 'x86', 'x64', 'arm64')
  performance: number; // Indeks performa CPU (contoh: skor benchmark)
  usage: number; // Penggunaan CPU saat ini dalam persen (0-100)
}

export interface BatteryInfo {
  level: number; // Persentase baterai (0-100)
  state?: string;
  charging: boolean; // Apakah sedang mengisi daya
  chargingTime: number | null; // Waktu pengisian yang tersisa dalam detik (null jika tidak tersedia)
  dischargingTime: number | null; // Waktu pengosongan yang tersisa dalam detik (null jika tidak tersedia)
}

export interface MemoryInfo {
  total: number; // Total memory in MB
  used: number; // Used memory in MB
  free: number; // Free memory in MB
  available?: number; // Optional available memory in MB
}


export interface StorageInfo {
  total: number; // Total kapasitas penyimpanan dalam GB
  used: number; // Penyimpanan yang digunakan dalam GB
  free: number; // Penyimpanan yang tersedia dalam GB
  available: number;  // Pastikan properti ini ada jika perlu
}

export interface NetworkInfo {
  type: string; // Jenis jaringan (contoh: 'Wi-Fi', '4G', 'Ethernet')
  connected: boolean; // Apakah perangkat terhubung ke jaringan
  speed: number; // Kecepatan jaringan dalam Mbps
  online: boolean; // Status koneksi (online atau offline)
  effectiveType?: string; // Add this if it's optional
  downlink?: number; // Add this if it's optional
  rtt?: number; // Add this if it's optional
}


export interface SystemInfo {
  userAgent: string; // Menambahkan properti 'userAgent'
  platform: string;
  language: string;
  cookiesEnabled: boolean;
  screenResolution: {
    width: number;
    height: number;
  };
}


export interface GraphicsInfo {
  renderer: string; // Renderer grafis (contoh: 'Intel HD Graphics 620')
  vendor: string; // Vendor perangkat grafis (contoh: 'Intel', 'NVIDIA')
  webglVersion: string; // Versi WebGL yang didukung (contoh: 'WebGL 1.0')
  maxTextureSize: number; // Ukuran tekstur maksimum yang didukung (dalam piksel)
  supported: boolean; // Apakah WebGL didukung
  extensions: string[]; // Daftar ekstensi WebGL yang didukung
}

export interface PerformanceMetrics {
  pageLoad: number; // Waktu pemuatan halaman (dalam milidetik)
  firstPaint: number; // Waktu sampai cat pertama (dalam milidetik)
  firstContentfulPaint: number; // Waktu sampai konten pertama terlihat (dalam milidetik)
  domInteractive: number; // Waktu sampai DOM dapat diinteraksi (dalam milidetik)
  resourceCount: number; // Jumlah sumber daya yang dimuat (contoh: skrip, gambar)
  memoryUsage: number; // Penggunaan memori (dalam MB)
  timing: {
    dns: number; // Waktu DNS lookup (dalam milidetik)
    tcp: number; // Waktu koneksi TCP (dalam milidetik)
    ttfb: number; // Time to First Byte (dalam milidetik)
  };
}

export interface SecurityInfo {
  https: boolean; // Apakah halaman menggunakan HTTPS
  tls: string; // Versi TLS yang digunakan (contoh: 'TLS 1.2', 'TLS 1.3')
  permissions: Record<string, string>; // Izin browser (contoh: 'camera': 'granted')
  securityHeaders: Record<string, boolean>; // Header keamanan yang digunakan (contoh: 'Content-Security-Policy': true)
  cookies: boolean; // Apakah cookies diaktifkan
  crossOriginIsolated: boolean; // Apakah halaman menggunakan isolasi lintas asal
}

export interface DeviceInfo {
  model: string | null;
  brand: string | null;
  osVersion: string | null;
  memory: {
    total: number;
    free: number;
    used: number;
    available?: number;
  };
}



// Update the DiagnosticState interface to include device information
export interface DiagnosticState {
  battery: BatteryInfo | null;
  memory: MemoryInfo | null;
  storage: StorageInfo | null;
  network: NetworkInfo | null;
  system: SystemInfo | null;
  cpu: CPUInfo | null;
  graphics: GraphicsInfo | null;
  performance: PerformanceMetrics | null;
  security: SecurityInfo | null;
  device: DeviceInfo | null; // Add this line
  isLoading: boolean;
  error: string | null;
}
