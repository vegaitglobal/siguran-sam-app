import * as Location from 'expo-location';
import { useEffect, useMemo, useState } from 'react';
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
	const [previousAppState, setPreviousAppState] =
		useState<AppStateStatus>('unknown');

	const [permissionResponse, requestPermission] =
		Location.useForegroundPermissions();

	useEffect(() => {
		const subscription = AppState.addEventListener(
			'change',
			async (nextAppState) => {
				if (permissionResponse?.granted) return;

				if (nextAppState === previousAppState) return;
				setPreviousAppState(nextAppState);
				if (nextAppState !== 'active') return;

				requestPermission();
			}
		);

		return () => subscription.remove();
	}, []);

	const permissionsGranted = useMemo(() => {
		return permissionResponse?.granted ? true : false;
	}, [permissionResponse]);

	const getLocation = async (
		resolveLocation: () => Promise<Location.LocationObject | null>
	): Promise<DeviceLocation> => {
		const location = await resolveLocation();

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

	return {
		getHighPriorityLocation: () =>
			getLocation(() =>
				Location.getCurrentPositionAsync().catch(
					Location.getLastKnownPositionAsync
				)
			),
		getLowPriorityLocation: () =>
			getLocation(() => Location.getLastKnownPositionAsync()),
		permissionsGranted,
	};
};

export default useLocation;
