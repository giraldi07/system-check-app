import { android } from '@nativescript/core';

export class MemoryCheck {
    checkMemory(): { total: number; available: number; used: number } {
        const context = android.app.Application.android.context;
        const activityManager = context.getSystemService(android.content.Context.ACTIVITY_SERVICE);
        const memoryInfo = new android.app.ActivityManager.MemoryInfo();
        
        activityManager.getMemoryInfo(memoryInfo);

        const total = memoryInfo.totalMem;
        const available = memoryInfo.availMem;
        const used = total - available;

        return {
            total: Math.floor(total / (1024 * 1024)), // Convert to MB
            available: Math.floor(available / (1024 * 1024)),
            used: Math.floor(used / (1024 * 1024))
        };
    }
}