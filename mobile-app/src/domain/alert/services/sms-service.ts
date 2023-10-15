import { Platform } from 'react-native';
import * as Network from 'expo-network';
import messageService from './message.service';

import { DeviceLocation } from '@/shared/hooks/use-location';

const sendSMS = async (
	username: string,
	recipients: string[],
	location: DeviceLocation
) => {
	let { type, isConnected, isInternetReachable } =
		await Network.getNetworkStateAsync();

	isInternetReachable = false;

	let message = `${username}: "Siguran Sam"
	Lokacija: https://maps.google.com/?q=${location.latitude},${location.longitude}
	Pozovite O.T.I.S: +3816102306685`;

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
