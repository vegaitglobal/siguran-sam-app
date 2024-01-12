import { Accuracy } from 'expo-location';
import { getBatteryLevelAsync } from 'expo-battery';
import * as Location from 'expo-location';
import { DeviceLocation } from '../types/model';

export const getWatcherOptions = async (): Promise<object> => {
  const batteryLevel = await getBatteryLevelAsync();
  return {
    accuracy: batteryLevel > 0.1 ? Accuracy.Highest : Accuracy.Balanced,
    distanceInterval: batteryLevel > 0.1 ? 1 : 30,
  };
};

export const convertToDeviceLocation = async (
  location: Location.LocationObject | null
): Promise<DeviceLocation | null> => {
  if (location == null) {
    return null;
  }

  const { longitude, latitude, altitude, accuracy } = location!.coords;

  const places = await Location.reverseGeocodeAsync({ longitude, latitude });
  const { city, country, street, streetNumber } = places[0];

  return {
    longitude,
    latitude,
    accuracy: accuracy?.toFixed(0).concat('m'),
    altitude: altitude || undefined,
    country: country || undefined,
    city: city || undefined,
    street: street || undefined,
    streetNumber: streetNumber || undefined,
    timestamp: new Date(location!.timestamp).toISOString(),
  };
};
