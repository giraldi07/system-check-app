import { android } from '@nativescript/core';

export class TemperatureCheck {
    checkTemperature(): { temperature: number; isOverheating: boolean } {
        const intent = android.app.Application.android.context.registerReceiver(
            null,
            new android.content.IntentFilter(android.content.Intent.ACTION_BATTERY_CHANGED)
        );

        const temperature = intent.getIntExtra(android.os.BatteryManager.EXTRA_TEMPERATURE, 0) / 10;
        const isOverheating = temperature > 45; // Consider over 45°C as overheating

        return {
            temperature,
            isOverheating
        };
    }
}