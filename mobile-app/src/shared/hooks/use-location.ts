import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

const useLocation = () => {
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(false);
	const [isAllowed, setIsAllowed] = useState(false);
	const [city, setCity] = useState<string | null>('');
	const [country, setCountry] = useState<string | null>('');
	const [street, setStreet] = useState<string | null>('');
	const [streetNumber, setStreetNumber] = useState<string | null>('');
	const [altitude, setAltitude] = useState<number | null>(null);
	const [accuracy, setAccuracy] = useState<number>(0);

	useEffect(() => {
		setLocationProperties();
	}, []);

	const setLocationProperties = async () => {
		setIsLoading(true);
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			setIsAllowed(false);
			return;
		}
		setIsAllowed(true);

		let location = await Location.getLastKnownPositionAsync();

		let accuracy = location?.coords.accuracy;
		let altitude = location?.coords.altitude;

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
		setAltitude(altitude as number);
		setAccuracy(accuracy as number);
		setLocation(location);
		setIsLoading(false);
	};

	const resetState = () => {
		setCity(null);
		setCountry(null);
		setStreet(null);
		setStreetNumber(null);
		setAccuracy(0);
		setLocation(null);
		setIsLoading(false);
	};

	return {
		location,
		isLoading,
		isAllowed,
		city,
		country,
		street,
		streetNumber,
		altitude,
		accuracy,
		setLocationProperties,
		resetState,
	};
};

export default useLocation;
