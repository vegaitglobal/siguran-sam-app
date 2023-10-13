import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

const useLocation = () => {
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(false);
	const [isAllowed, setIsAllowed] = useState(false);
	const [getLocation, setGetLocation] = useState(false);
	const [regionName, setRegionName] = useState(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setIsAllowed(false);
				return;
			}
			setIsAllowed(true);

			let location = await Location.getLastKnownPositionAsync({});
			setLocation(location);
			setIsLoading(false);
		})();
	}, [getLocation]);

	return {
		location,
		isLoading,
		isAllowed,
		getLocation,
		setGetLocation,
	};
};

export default useLocation;
