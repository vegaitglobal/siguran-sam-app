import { Platform } from 'react-native';
import getLocation from './location-service';
import * as Network from 'expo-network';
import messageService from './message.service';

const sendSMS = async () => {
	const location = await getLocation();
	let { type, isConnected, isInternetReachable } =
		await Network.getNetworkStateAsync();

	isInternetReachable = false;

	let recipients = ['123456', '555666'];

	let message = `Hello, I am in danger. My current location is: https://maps.google.com/?q=${location?.coords.latitude},${location?.coords.longitude}`;

	if (isInternetReachable) {
		messageService.sendOnlineSMS(recipients, message);
	} else {
		messageService.sendNativeSMS(
			Platform.OS === 'ios' ? recipients : recipients.join(', '),
			message
		);
	}
};

export default sendSMS;
