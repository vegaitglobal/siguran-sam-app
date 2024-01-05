import * as Location from 'expo-location';
import { LocationSubscription } from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

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
		requestPermissionAndExecute(startLocationTracking);
		const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

		return () => {
			stopLocationTracking();
			appStateSubscription.remove();
		}
	}, []);

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
			await requestPermissionAndExecute(startLocationTracking);
		} else {
			stopLocationTracking();
		}

		console.log(isTransitioningToForeground ? "Foreground" : "Background");
		appState.current = nextAppState;
	}

	const startLocationTracking = async () => {
		if (locationWatcher.current) {
			return;
		}

		const watcherOptions = {
			accuracy: Location.Accuracy.Highest,
			distanceInterval: 10,
			timeInterval: 5000
		}

		const handleLocationChange = async (newLocation: Location.LocationObject | null) => {
			console.log(newLocation);
			const deviceLocation = await convertToDeviceLocation(newLocation);

			if (deviceLocation) {
				setLocation(deviceLocation);
			}
		}

		locationWatcher.current = await Location.watchPositionAsync(
			watcherOptions,
			handleLocationChange
		);

		console.log("Tracker added.");
	}

	const stopLocationTracking = async () => {
		if (!locationWatcher.current) {
			return;
		}

		locationWatcher.current.remove();
		locationWatcher.current = null;

		console.log("Tracker removed.");
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
