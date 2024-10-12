import * as Location from 'expo-location';
import { LocationSubscription } from 'expo-location';
import { useCallback, useEffect, useState } from 'react';

import { convertToDeviceLocation, getWatcherOptions } from '../../../shared/utils/location-utils';
import { DeviceLocation } from '@/shared/types';
import { Alert } from 'react-native';

const useLocation = ({ canGetLocation }: { canGetLocation: boolean }) => {
  const [location, setLocation] = useState<DeviceLocation>();
  const [watcherOptions, setWatcherOptions] = useState<Location.LocationOptions>();
  const [initialLocationLoaded, setInitialLocationLoaded] = useState(false);

  const getCurrentPosition = useCallback(async () => {
    try {
      const location = await Location.getCurrentPositionAsync();
      const deviceLocation = await convertToDeviceLocation(location);
      if (deviceLocation) setLocation(deviceLocation);
    } catch {
      Alert.alert('Desila se greska prilikom učitavanja pozicije.');
    } finally {
      setInitialLocationLoaded(true);
    }
  }, []);

  const getLastKnownPosition = useCallback(async () => {
    try {
      const location = await Location.getLastKnownPositionAsync();
      const deviceLocation = await convertToDeviceLocation(location);
      if (deviceLocation) setLocation(deviceLocation);
    } catch {
      Alert.alert('Desila se greska prilikom učitavanja pozicije.');
    } finally {
      setInitialLocationLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!canGetLocation) return;

    getCurrentPosition();
    getLastKnownPosition();
  }, [getCurrentPosition, getLastKnownPosition, canGetLocation]);

  useEffect(() => {
    getWatcherOptions().then((options) => {
      setWatcherOptions(options);
    });
  }, []);

  useEffect(() => {
    if (!watcherOptions) return;
    if (!initialLocationLoaded) return;

    let locationSubscription: LocationSubscription | undefined;

    Location.watchPositionAsync(watcherOptions, async (location) => {
      const deviceLocation = await convertToDeviceLocation(location);
      if (!deviceLocation) return;
      setLocation(deviceLocation);
    }).then((subscription) => {
      locationSubscription = subscription;
    });

    return () => {
      locationSubscription?.remove();
    };
  }, [initialLocationLoaded, watcherOptions]);

  return {
    location,
    initialLocationLoaded,
  };
};

export default useLocation;
