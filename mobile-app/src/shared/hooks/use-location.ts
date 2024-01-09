import * as Location from 'expo-location';
import { LocationSubscription } from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { getBatteryLevelAsync } from 'expo-battery';

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
	const [permissionResponse, setPermissionResponse] = useState<Location.LocationPermissionResponse>();
	const [location, setLocation] = useState({} as DeviceLocation);
	const appState = useRef(AppState.currentState);
	const locationWatcher = useRef<LocationSubscription | null>(null);

	useEffect(() => {
		requestPermissionAndExecute(async () => {
			await setLastKnownLocation();
			startLocationTracking();
		});
		const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

		return () => {
			stopLocationTracking();
			appStateSubscription.remove();
		}
	}, []);

	const getWatcherOptions = async (): Promise<{}> => {
		const batteryLevel = await getBatteryLevelAsync();
		return {
			accuracy: Location.Accuracy.Highest,
			distanceInterval: batteryLevel <= 0.2 ? 30 : 10
		};
	}

	const setLastKnownLocation = async () => {
		const lastKnownLocation = await Location.getLastKnownPositionAsync();
		const deviceLocation = await convertToDeviceLocation(lastKnownLocation);
		if (deviceLocation) {
			setLocation(deviceLocation);
		}
	}

	const requestPermissionAndExecute = async (callback: () => void) => {
		const permissionResponse = await Location.requestForegroundPermissionsAsync();
		setPermissionResponse(permissionResponse);
		if (permissionResponse.granted) {
			callback();
		}
	}

	const handleAppStateChange = async (nextAppState: AppStateStatus) => {
		if (nextAppState === appState.current) return;

		const isTransitioningToForeground = appState.current.match(/inactive|background/) && nextAppState === 'active';

		if (isTransitioningToForeground) {
			await requestPermissionAndExecute(async () => {
				await setLastKnownLocation();
				startLocationTracking();
			});
		} else {
			stopLocationTracking();
		}

		appState.current = nextAppState;
	}

	const startLocationTracking = async () => {
		if (locationWatcher.current) {
			return;
		}

		const watcherOptions = await getWatcherOptions();

		const handleLocationChange = async (newLocation: Location.LocationObject | null) => {
			const deviceLocation = await convertToDeviceLocation(newLocation);

			if (deviceLocation) {
				setLocation(deviceLocation);
			}
		}

		locationWatcher.current = await Location.watchPositionAsync(
			watcherOptions,
			handleLocationChange
		);
	}

	const stopLocationTracking = async () => {
		if (!locationWatcher.current) {
			return;
		}

		locationWatcher.current.remove();
		locationWatcher.current = null;
	}

	const convertToDeviceLocation = async (location: Location.LocationObject | null): Promise<DeviceLocation | null> => {
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
	}

	return {
		isPermissionGranted: permissionResponse?.granted,
		location
	};
};

export default useLocation;
