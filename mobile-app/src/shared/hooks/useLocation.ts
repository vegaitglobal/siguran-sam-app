import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

const useLocation = () => {
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(false);
	const [isAllowed, setIsAllowed] = useState(false);
	const [getLocation, setGetLocation] = useState(false);
	const [city, setCity] = useState<string | null>('');
	const [country, setCountry] = useState<string | null>('');
	const [street, setStreet] = useState<string | null>('');
	const [streetNumber, setStreetNumber] = useState<string | null>('');

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
			const place = await Location.reverseGeocodeAsync({
				latitude: location?.coords.latitude as number,
				longitude: location?.coords.longitude as number,
			});

			let city = place[0]['city'];
			let country = place[0]['country'];
			let street = place[0]['street'];
			let streetNumber = place[0]['streetNumber'];
			setCity(city);
			setCountry(country);
			setStreet(street);
			setStreetNumber(streetNumber);
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
		city,
		country,
		street,
		streetNumber,
	};
};

export default useLocation;
