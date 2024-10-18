import { useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { useAppStateChange } from '@/shared/hooks/use-app-state-change';

export const useLocationServices = () => {
  const [locationServicesEnabled, setLocationServicesEnabled] = useState<boolean>();
  const [loadingLocationServices, setLoadingLocationServices] = useState(true);

  const checkLocationServices = useCallback(async () => {
    try {
      setLoadingLocationServices(true);
      const value = await Location.hasServicesEnabledAsync();
      setLocationServicesEnabled(value);
    } catch (e) {
      Alert.alert('Desila se greska prilikom provere podešavanja lokacije.');
    } finally {
      setLoadingLocationServices(false);
    }
  }, []);

  const handleOnAppForeground = useCallback(async () => {
    const value = await Location.hasServicesEnabledAsync();
    setLocationServicesEnabled(value);
  }, []);

  useAppStateChange({ onAppForeground: handleOnAppForeground });

  useEffect(() => {
    checkLocationServices();
  }, [checkLocationServices]);

  return {
    locationServicesEnabled,
    loadingLocationServices,
  };
};
