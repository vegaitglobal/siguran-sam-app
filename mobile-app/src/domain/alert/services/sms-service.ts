import { Platform } from 'react-native';
import getLocation from './location-service';
import * as Network from 'expo-network';
import messageService from './message.service';
import { LocationObject } from 'expo-location';
import { DeviceLocation } from '@/shared/hooks/use-location';

const sendSMS = async (location: DeviceLocation) => {
	let { type, isConnected, isInternetReachable } =
		await Network.getNetworkStateAsync();

	isInternetReachable = false;

	let recipients = ['123456', '555666'];

	let message = `Hello, I am in danger. My current location is: https://maps.google.com/?q=${location.latitude},${location.longitude}`;

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
