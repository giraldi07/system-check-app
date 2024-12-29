import { android } from '@nativescript/core';

export class StorageCheck {
    checkStorage(): { total: number; available: number; used: number } {
        const statFs = new android.os.StatFs(android.os.Environment.getDataDirectory().getPath());
        
        const blockSize = statFs.getBlockSizeLong();
        const totalBlocks = statFs.getBlockCountLong();
        const availableBlocks = statFs.getAvailableBlocksLong();

        const total = blockSize * totalBlocks;
        const available = blockSize * availableBlocks;
        const used = total - available;

        return {
            total: Math.floor(total / (1024 * 1024)), // Convert to MB
            available: Math.floor(available / (1024 * 1024)),
            used: Math.floor(used / (1024 * 1024))
        };
    }
}