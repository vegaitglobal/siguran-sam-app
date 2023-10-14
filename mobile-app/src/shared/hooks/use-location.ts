import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

const useLocation = () => {
	const [location, setLocation] = useState<Location.LocationObject | null>(
		null
	);
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
	};

	return {
		location,
		isAllowed,
		setIsAllowed,
		city,
		country,
		street,
		streetNumber,
		altitude,
		accuracy,
		setLocationProperties,
	};
};

export default useLocation;
