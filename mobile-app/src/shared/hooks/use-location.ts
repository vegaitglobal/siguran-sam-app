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
	const [permissionGranted, setPermissionGranted] = useState(true);
	const [location, setLocation] = useState({} as DeviceLocation);
	const locationWatcher = useRef<LocationSubscription | null>(null);
	const [previousAppState, setPreviousAppState] =
		useState<AppStateStatus>('unknown');

	useEffect(() => {
		startLocationTracking();
		const subscription = AppState.addEventListener('change', handleAppStateChange);

		return () => {
			stopLocationTracking();
			subscription.remove();
		}
	}, []);

	const handleAppStateChange = (nextAppState: AppStateStatus) => {
		if (!permissionGranted) return;

		if (nextAppState === previousAppState) return;

		setPreviousAppState(nextAppState);

		if (nextAppState !== 'active') {
			stopLocationTracking();
			console.log("I'm in background, so I stopped tracking");
		} else {
			console.log("I'm in foreground, so I started tracking");
			startLocationTracking();
		}
	}

	const startLocationTracking = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			setPermissionGranted(false);
			return;
		}
		setPermissionGranted(true);

		if (locationWatcher.current) {
			return;
		}

		locationWatcher.current = await Location.watchPositionAsync(
			{ accuracy: Location.Accuracy.Balanced, distanceInterval: 10, timeInterval: 2000 },
			async (newLocation) => {
				console.log(newLocation);
				const deviceLocation = await convertToDeviceLocation(newLocation);
				setLocation(deviceLocation);
			}
		);

	}

	const stopLocationTracking = async () => {
		if (!locationWatcher.current) {
			return;
		}

		await locationWatcher.current.remove();
		locationWatcher.current = null;

		console.log("I've been removed.");
	}

	const convertToDeviceLocation = async (location: Location.LocationObject | null): Promise<DeviceLocation> => {
		if (location == null) {
			return {} as DeviceLocation
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
		permissionGranted,
		location
	};
};

export default useLocation;
