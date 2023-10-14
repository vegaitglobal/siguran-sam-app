import * as SMS from 'expo-sms';
import { Platform } from 'react-native';
import getLocation from './location-service';

const sendSMS = async () => {
	const isAvailable = await SMS.isAvailableAsync();
	if (isAvailable) {
		try {
			const location = await getLocation();

			// contacts = getContacts(Platform.OS)
			let contacts;
			if (Platform.OS === 'ios') {
				contacts = ['123456', '555666'];
			} else {
				contacts = '123456, 555666';
			}
			// const message = getMessage()
			const message = `Hello, I am in danger. My current location is: https://maps.google.com/?q=${location?.coords.latitude},${location?.coords.longitude}`;

			const { result } = await SMS.sendSMSAsync(contacts, message);

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
