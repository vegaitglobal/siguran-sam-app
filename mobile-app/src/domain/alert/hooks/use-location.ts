import * as Location from 'expo-location';
import { LocationSubscription } from 'expo-location';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { convertToDeviceLocation, getWatcherOptions } from '../../../shared/utils/location-utils';
import { useLocationStore } from '@/shared/store/use-location-store';

const useLocation = () => {
  const [permissionResponse, setPermissionResponse] =
    useState<Location.LocationPermissionResponse>();
  const location = useLocationStore((state) => state.location);
  const updateDeviceLocation = useLocationStore((state) => state.updateDeviceLocation);
  const locationRef = useRef(location);
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
        updateDeviceLocation(deviceLocation);
      }
    };

    locationWatcher.current = await Location.watchPositionAsync(
      watcherOptions,
      handleLocationChange
    );
  }, [updateDeviceLocation]);

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
      updateDeviceLocation(deviceLocation);
    }
  }, [updateDeviceLocation]);

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
    useLocationStore.subscribe((state) => (locationRef.current = state.location));
  }, []);

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
    locationRef,
  };
};

export default useLocation;
