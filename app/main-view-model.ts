import { Observable } from '@nativescript/core';
import { BatteryCheck } from './services/battery-check';
import { StorageCheck } from './services/storage-check';
import { MemoryCheck } from './services/memory-check';
import { TemperatureCheck } from './services/temperature-check';

export class MainViewModel extends Observable {
    private batteryCheck: BatteryCheck;
    private storageCheck: StorageCheck;
    private memoryCheck: MemoryCheck;
    private temperatureCheck: TemperatureCheck;

    constructor() {
        super();
        this.batteryCheck = new BatteryCheck();
        this.storageCheck = new StorageCheck();
        this.memoryCheck = new MemoryCheck();
        this.temperatureCheck = new TemperatureCheck();
    }

    runDiagnostics() {
        const batteryStatus = this.batteryCheck.checkBatteryHealth();
        const storageStatus = this.storageCheck.checkStorage();
        const memoryStatus = this.memoryCheck.checkMemory();
        const temperatureStatus = this.temperatureCheck.checkTemperature();

        this.notifyPropertyChange('diagnosticResults', {
            battery: batteryStatus,
            storage: storageStatus,
            memory: memoryStatus,
            temperature: temperatureStatus
        });
    }
}