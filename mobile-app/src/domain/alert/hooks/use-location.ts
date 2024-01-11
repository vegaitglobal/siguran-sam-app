import * as Location from 'expo-location';
import { LocationSubscription } from 'expo-location';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { convertToDeviceLocation, getWatcherOptions } from '../../../shared/utils/location-utils';

export interface DeviceLocation {
  longitude: number;
  latitude: number;
  altitude?: number;
  country?: string;
  city?: string;
  street?: string;
  streetNumber?: string;
  accuracy?: string;
  timestamp: string;
}

const useLocation = () => {
  const [permissionResponse, setPermissionResponse] =
    useState<Location.LocationPermissionResponse>();
  const [location, setLocation] = useState<DeviceLocation>();
  const appState = useRef(AppState.currentState);
  const locationWatcher = useRef<LocationSubscription | null>(null);

  const startLocationTracking = useCallback(async () => {
    if (locationWatcher.current) {
      return;
    }

    const watcherOptions = await getWatcherOptions();
    const handleLocationChange = async (newLocation: Location.LocationObject | null) => {
      const deviceLocation = await convertToDeviceLocation(newLocation);

      if (deviceLocation) {
        setLocation(deviceLocation);
      }
    };

    locationWatcher.current = await Location.watchPositionAsync(
      watcherOptions,
      handleLocationChange
    );
  }, []);

  const stopLocationTracking = useCallback(() => {
    if (!locationWatcher.current) {
      return;
    }

    locationWatcher.current.remove();
    locationWatcher.current = null;
  }, []);

  const setLastKnownLocation = useCallback(async () => {
    const lastKnownLocation = await Location.getLastKnownPositionAsync();
    const deviceLocation = await convertToDeviceLocation(lastKnownLocation);
    if (deviceLocation) {
      setLocation(deviceLocation);
    }
  }, []);

  const startTrackingAfterLastKnownLocation = useCallback(async () => {
    await setLastKnownLocation();
    startLocationTracking();
  }, [startLocationTracking, setLastKnownLocation]);

  const requestPermission = useCallback(async () => {
    const permissionResponse = await Location.requestForegroundPermissionsAsync();
    setPermissionResponse(permissionResponse);
  }, [setPermissionResponse]);

  const handleAppStateChange = useCallback(
    async (nextAppState: AppStateStatus) => {
      if (nextAppState === appState.current) return;

      const isTransitioningToForeground =
        appState.current.match(/inactive|background/) && nextAppState === 'active';

      if (isTransitioningToForeground) {
        await requestPermission();
      } else {
        stopLocationTracking();
      }

      appState.current = nextAppState;
    },
    [stopLocationTracking, requestPermission]
  );

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);
    return () => appStateSubscription.remove();
  }, [handleAppStateChange]);

  useEffect(() => {
    if (!permissionResponse?.granted) {
      return;
    }

    startTrackingAfterLastKnownLocation();
    return () => stopLocationTracking();
  }, [startTrackingAfterLastKnownLocation, stopLocationTracking, permissionResponse]);

  return {
    isPermissionGranted: permissionResponse?.granted,
    location,
  };
};

export default useLocation;
