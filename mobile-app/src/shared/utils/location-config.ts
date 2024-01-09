import { Accuracy } from 'expo-location';
import { getBatteryLevelAsync } from 'expo-battery';

export const getWatcherOptions = async (): Promise<{}> => {
    const batteryLevel = await getBatteryLevelAsync();
    return {
        accuracy: batteryLevel > 0.1 ? Accuracy.Highest : Accuracy.Balanced,
        distanceInterval: batteryLevel > 0.1 ? 1 : 30
    };
}