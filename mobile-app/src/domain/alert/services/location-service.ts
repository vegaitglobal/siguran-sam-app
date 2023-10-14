import * as Location from 'expo-location';

export default async function getLocation(): Promise<Location.LocationObject | null> {
	const options = {
		accuracy: Location.Accuracy.Highest,
	};
	let location;

	try {
		location = await Location.getCurrentPositionAsync(options);
	} catch (e) {
		console.log(e);
		location = await Location.getLastKnownPositionAsync();
	}

	return location;
}
