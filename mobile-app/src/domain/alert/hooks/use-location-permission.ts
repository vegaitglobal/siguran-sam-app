import { useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { useAppStateChange } from '@/shared/hooks/use-app-state-change';

export const useLocationPermission = () => {
  const [permission, setPermission] = useState<Location.LocationPermissionResponse>();
  const [loadingPermission, setLoadingPermission] = useState(true);

  const requestPermission = useCallback(async () => {
    try {
      setLoadingPermission(true);
      const permissionResponse = await Location.requestForegroundPermissionsAsync();
      setPermission(permissionResponse);
    } catch {
      Alert.alert('Desila se greska prilikom provere permisija lokacije.');
    } finally {
      setLoadingPermission(false);
    }
  }, []);

  const handleOnAppForeground = useCallback(() => requestPermission(), [requestPermission]);

  useAppStateChange({ onAppForeground: handleOnAppForeground });

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  return {
    permission,
    loadingPermission,
  };
};
