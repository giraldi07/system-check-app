declare module 'expo-system-info' {
    export function getTotalMemoryAsync(): Promise<number>;
    export function getFreeMemoryAsync(): Promise<number>;
    // Tambahkan fungsi lainnya jika diperlukan
  }
  