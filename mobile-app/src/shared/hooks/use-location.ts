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
	const [permissionStatus, setPermissionStatus] =
		useState<Location.PermissionStatus>(Location.PermissionStatus.UNDETERMINED);

	useEffect(() => {
		const subscription = AppState.addEventListener(
			'change',
			async (nextAppState) => {
				if (nextAppState === previousAppState) return;
				setPreviousAppState(nextAppState);
				if (nextAppState !== 'active') return;

				Location.requestForegroundPermissionsAsync().then(({ status }) => {
					setPermissionStatus(status);
				});
			}
		);

		return () => subscription.remove();
	}, [setPermissionStatus]);

	const permissionsGranted = useMemo(() => {
		return permissionStatus === Location.PermissionStatus.GRANTED;
	}, [permissionStatus]);

	const getLocation = async (): Promise<DeviceLocation> => {
		const location = await Location.getCurrentPositionAsync().catch(
			Location.getLastKnownPositionAsync
		);

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
		getLocation,
		permissionsGranted,
	};
};

export default useLocation;
