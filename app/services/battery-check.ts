import { android } from '@nativescript/core';

export class BatteryCheck {
    checkBatteryHealth(): { status: string; health: string } {
        const context = android.content.Context;
        const intent = android.app.Application.android.context.registerReceiver(
            null,
            new android.content.IntentFilter(android.content.Intent.ACTION_BATTERY_CHANGED)
        );

        const health = intent.getIntExtra(android.os.BatteryManager.EXTRA_HEALTH, -1);
        const status = intent.getIntExtra(android.os.BatteryManager.EXTRA_STATUS, -1);

        return {
            status: this.getBatteryStatusString(status),
            health: this.getBatteryHealthString(health)
        };
    }

    private getBatteryHealthString(health: number): string {
        switch (health) {
            case android.os.BatteryManager.BATTERY_HEALTH_GOOD:
                return "Good";
            case android.os.BatteryManager.BATTERY_HEALTH_OVERHEAT:
                return "Overheated";
            case android.os.BatteryManager.BATTERY_HEALTH_DEAD:
                return "Dead";
            case android.os.BatteryManager.BATTERY_HEALTH_OVER_VOLTAGE:
                return "Over Voltage";
            case android.os.BatteryManager.BATTERY_HEALTH_UNSPECIFIED_FAILURE:
                return "Unspecified Failure";
            default:
                return "Unknown";
        }
    }

    private getBatteryStatusString(status: number): string {
        switch (status) {
            case android.os.BatteryManager.BATTERY_STATUS_CHARGING:
                return "Charging";
            case android.os.BatteryManager.BATTERY_STATUS_DISCHARGING:
                return "Discharging";
            case android.os.BatteryManager.BATTERY_STATUS_FULL:
                return "Full";
            case android.os.BatteryManager.BATTERY_STATUS_NOT_CHARGING:
                return "Not Charging";
            default:
                return "Unknown";
        }
    }
}