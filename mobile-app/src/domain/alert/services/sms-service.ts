import * as SMS from 'expo-sms';
import * as Location from 'expo-location';

const sendSMS = async () => {
	const isAvailable = await SMS.isAvailableAsync();
	if (isAvailable) {
		try {
			const location = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.Highest,
			});
			const androidContacts = '+381693367282, +381612855223';
			const iOSContacts = ['+381612855223', '+381693367282'];
			const message = `Hello, I am in danger. My current location is: https://maps.google.com/?q=${location?.coords.latitude},${location?.coords.longitude}`;

			const { result } = await SMS.sendSMSAsync(androidContacts, message);

			switch (result) {
				case 'cancelled':
					console.log('SMS not sent');
				case 'sent':
					console.log('SMS sent');
				case 'unknown':
					console.log("I'm an Android device and I don't send any feedback.");
			}
		} catch (e) {
			console.log(e);
		}
	} else {
		console.log("There's no SMS available on this device.");
	}
};

export default sendSMS;
